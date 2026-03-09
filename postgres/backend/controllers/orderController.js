import { Sequelize } from "sequelize"
import Order from "../models/Order.js"
import Cart from "../models/Cart.js"
import Product from "../models/Product.js"
import sequelize from "../db.js"

export const createOrder = async (req, res, next) => {
  const t = await sequelize.transaction()
  try {
    const { shippingAddress, paymentMethod } = req.body

    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({ error: "Missing shipping address or payment method" })
    }

    const cart = await Cart.findOne({ where: { clerkId: req.userId }, transaction: t })
    if (!cart || cart.items.length === 0) {
      await t.rollback()
      return res.status(400).json({ error: "Cart is empty" })
    }

    const orderItems = []
    let totalPrice = 0

    for (const item of cart.items) {
      const product = await Product.findByPk(item.productId, { transaction: t })

      if (!product || product.stock < item.quantity) {
        await t.rollback()
        return res.status(400).json({
          error: `Insufficient stock for ${product?.name || "product"}`,
        })
      }

      await product.decrement("stock", { by: item.quantity, transaction: t })

      orderItems.push({
        productId: item.productId,
        name: product.name,
        price: parseFloat(product.price),
        quantity: item.quantity,
      })

      totalPrice += parseFloat(product.price) * item.quantity
    }

    const order = await Order.create(
      {
        clerkId: req.userId,
        items: orderItems,
        totalPrice,
        shippingAddress,
        paymentMethod,
        status: "pending",
        paymentStatus: "pending",
      },
      { transaction: t },
    )

    cart.items = []
    await cart.save({ transaction: t })

    await t.commit()

    res.status(201).json({ message: "Order created successfully", order })
  } catch (error) {
    await t.rollback()
    next(error)
  }
}

export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { clerkId: req.userId },
      order: [["createdAt", "DESC"]],
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
}

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId)

    if (!order) {
      return res.status(404).json({ error: "Order not found" })
    }

    if (order.clerkId !== req.userId) {
      return res.status(403).json({ error: "Unauthorized" })
    }

    res.json(order)
  } catch (error) {
    next(error)
  }
}

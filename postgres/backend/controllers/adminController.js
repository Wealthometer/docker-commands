import Product from "../models/Product.js"
import Order from "../models/Order.js"
import Contact from "../models/Contact.js"
import { Op } from "sequelize"

// Product Management
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, subcategory, images, stock, tags } = req.body

    if (!name || !description || !price || !category || !images) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      subcategory,
      images,
      stock: stock || 0,
      tags: tags || [],
    })

    res.status(201).json(product)
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (req, res, next) => {
  try {
    const [updatedCount] = await Product.update(req.body, {
      where: { id: req.params.id },
      returning: true,
      individualHooks: true,
    })

    if (updatedCount === 0) {
      return res.status(404).json({ error: "Product not found" })
    }

    const product = await Product.findByPk(req.params.id)
    res.json(product)
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    const deleted = await Product.destroy({ where: { id: req.params.id } })
    if (!deleted) {
      return res.status(404).json({ error: "Product not found" })
    }

    res.json({ message: "Product deleted successfully" })
  } catch (error) {
    next(error)
  }
}

export const updateStock = async (req, res, next) => {
  try {
    const { quantity, action } = req.body // action: 'set', 'add', 'subtract'

    if (action === "set") {
      await Product.update({ stock: quantity }, { where: { id: req.params.id } })
    } else if (action === "add") {
      await Product.increment("stock", { by: quantity, where: { id: req.params.id } })
    } else if (action === "subtract") {
      await Product.decrement("stock", { by: quantity, where: { id: req.params.id } })
    }

    const product = await Product.findByPk(req.params.id)
    res.json(product)
  } catch (error) {
    next(error)
  }
}

// Order Management
export const getAllOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query
    const offset = (page - 1) * limit

    const where = {}
    if (status) where.status = status

    const { rows: orders, count: total } = await Order.findAndCountAll({
      where,
      order: [["createdAt", "DESC"]],
      offset,
      limit: Number.parseInt(limit),
    })

    res.json({
      data: orders,
      pagination: {
        total,
        page: Number.parseInt(page),
        limit: Number.parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    next(error)
  }
}

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, paymentStatus } = req.body

    const [count] = await Order.update(
      { status, paymentStatus },
      { where: { id: req.params.id }, returning: true },
    )

    if (count === 0) {
      return res.status(404).json({ error: "Order not found" })
    }

    const order = await Order.findByPk(req.params.id)
    res.json(order)
  } catch (error) {
    next(error)
  }
}

// Contact Messages
export const getContactMessages = async (req, res, next) => {
  try {
    const { status = "new", page = 1, limit = 20 } = req.query
    const offset = (page - 1) * limit

    const where = {}
    if (status) where.status = status

    const { rows: messages, count: total } = await Contact.findAndCountAll({
      where,
      order: [["createdAt", "DESC"]],
      offset,
      limit: Number.parseInt(limit),
    })

    res.json({
      data: messages,
      pagination: { total, page: Number.parseInt(page), limit: Number.parseInt(limit) },
    })
  } catch (error) {
    next(error)
  }
}

export const updateMessageStatus = async (req, res, next) => {
  try {
    const { status } = req.body
    const [count] = await Contact.update({ status }, { where: { id: req.params.id }, returning: true })

    if (count === 0) {
      return res.status(404).json({ error: "Message not found" })
    }

    const message = await Contact.findByPk(req.params.id)
    res.json(message)
  } catch (error) {
    next(error)
  }
}

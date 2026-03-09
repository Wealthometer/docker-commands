import Cart from "../models/Cart.js"
import Product from "../models/Product.js"

// helper to compute total by fetching product prices
const calculateTotal = async (items) => {
  if (!items || items.length === 0) return 0
  const ids = items.map((i) => i.productId)
  const products = await Product.findAll({ where: { id: ids } })
  const priceMap = {}
  products.forEach((p) => {
    priceMap[p.id] = parseFloat(p.price)
  })
  return items.reduce((sum, item) => {
    return sum + (priceMap[item.productId] || 0) * item.quantity
  }, 0)
}

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ where: { clerkId: req.userId } })

    if (!cart) {
      return res.json({ items: [], total: 0 })
    }

    const total = await calculateTotal(cart.items)
    res.json({ items: cart.items, total })
  } catch (error) {
    next(error)
  }
}

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body

    if (!productId || quantity < 1) {
      return res.status(400).json({ error: "Invalid product ID or quantity" })
    }

    const product = await Product.findByPk(productId)
    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        error: "Insufficient stock",
        available: product.stock,
      })
    }

    let cart = await Cart.findOne({ where: { clerkId: req.userId } })
    if (!cart) {
      cart = await Cart.create({ clerkId: req.userId, items: [] })
    }

    const existingItem = cart.items.find((item) => item.productId === productId)
    if (existingItem) {
      if (product.stock < existingItem.quantity + quantity) {
        return res.status(400).json({
          error: "Insufficient stock for requested quantity",
          available: product.stock - existingItem.quantity,
        })
      }
      existingItem.quantity += quantity
    } else {
      cart.items.push({ productId, quantity })
    }

    await cart.save()
    const total = await calculateTotal(cart.items)
    res.json({ message: "Added to cart", cart: { items: cart.items, total } })
  } catch (error) {
    next(error)
  }
}

export const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body
    const { productId } = req.params

    if (quantity < 1) {
      return res.status(400).json({ error: "Invalid quantity" })
    }

    const product = await Product.findByPk(productId)
    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        error: "Insufficient stock",
        available: product.stock,
      })
    }

    const cart = await Cart.findOne({ where: { clerkId: req.userId } })
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" })
    }

    const item = cart.items.find((i) => i.productId === productId)
    if (!item) {
      return res.status(404).json({ error: "Item not in cart" })
    }

    item.quantity = quantity
    await cart.save()

    const total = await calculateTotal(cart.items)
    res.json({ message: "Cart updated", cart: { items: cart.items, total } })
  } catch (error) {
    next(error)
  }
}

export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params

    const cart = await Cart.findOne({ where: { clerkId: req.userId } })
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" })
    }

    cart.items = cart.items.filter((item) => item.productId !== productId)
    await cart.save()

    res.json({ message: "Item removed from cart", cart })
  } catch (error) {
    next(error)
  }
}

export const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ where: { clerkId: req.userId } })
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" })
    }

    cart.items = []
    await cart.save()

    res.json({ message: "Cart cleared" })
  } catch (error) {
    next(error)
  }
}

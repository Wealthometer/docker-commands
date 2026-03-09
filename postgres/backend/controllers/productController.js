import Product from "../models/Product.js"
import { Op } from "sequelize"

export const getAllProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, sort = "-createdAt" } = req.query
    const offset = (page - 1) * limit
    // convert sort like "-createdAt" to [["createdAt","DESC"]]
    let order = []
    if (sort) {
      const direction = sort.startsWith("-") ? "DESC" : "ASC"
      const field = sort.replace(/^[-+]/, "")
      order.push([field, direction])
    }

    const { rows: products, count: total } = await Product.findAndCountAll({
      where: { status: "active" },
      order,
      offset,
      limit: Number.parseInt(limit),
    })

    res.json({
      data: products,
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

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (!product) {
      const error = new Error("Product not found")
      error.statusCode = 404
      throw error
    }
    res.json(product)
  } catch (error) {
    next(error)
  }
}

export const getProductsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params
    const { page = 1, limit = 20 } = req.query
    const offset = (page - 1) * limit

    const { rows: products, count: total } = await Product.findAndCountAll({
      where: { category, status: "active" },
      offset,
      limit: Number.parseInt(limit),
    })

    res.json({
      data: products,
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

export const searchProducts = async (req, res, next) => {
  try {
    const { q } = req.query
    if (!q || q.trim().length < 2) {
      return res.status(400).json({ error: "Search query too short" })
    }

    const term = `%${q.trim()}%`
    const products = await Product.findAll({
      where: {
        status: "active",
        [Op.or]: [
          { name: { [Op.iLike]: term } },
          { description: { [Op.iLike]: term } },
          // tags is an array, use any element ILIKE
          { tags: { [Op.overlap]: [q.trim()] } },
        ],
      },
      limit: 50,
    })

    res.json(products)
  } catch (error) {
    next(error)
  }
}

export const getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: { featured: true, status: "active" },
      limit: 10,
    })
    res.json(products)
  } catch (error) {
    next(error)
  }
}

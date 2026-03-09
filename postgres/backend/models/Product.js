import { DataTypes } from "sequelize"
import sequelize from "../db.js"

const Product = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: { min: 0 },
    },
    originalPrice: {
      type: DataTypes.DECIMAL,
      validate: { min: 0 },
    },
    category: {
      type: DataTypes.ENUM("pets", "food", "toys", "accessories", "health", "beds"),
      allowNull: false,
    },
    subcategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 },
    },
    lowStockThreshold: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
    },
    status: {
      type: DataTypes.ENUM("active", "sold_out", "discontinued"),
      defaultValue: "active",
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { min: 0, max: 5 },
    },
    reviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  },
)

// hook to update stock/status
Product.beforeSave((product) => {
  if (product.stock === 0) {
    product.status = "sold_out"
  } else if (product.status === "sold_out" && product.stock > 0) {
    product.status = "active"
  }
})

export default Product

import { DataTypes } from "sequelize"
import sequelize from "../db.js"

const Order = sequelize.define(
  "Order",
  {
    clerkId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    items: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
    },
    totalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: { min: 0 },
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "shipped", "delivered", "cancelled"),
      defaultValue: "pending",
    },
    shippingAddress: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    paymentMethod: DataTypes.STRING,
    paymentStatus: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      defaultValue: "pending",
    },
  },
  {
    timestamps: true,
  },
)

export default Order

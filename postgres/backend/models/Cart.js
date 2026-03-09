import { DataTypes } from "sequelize"
import sequelize from "../db.js"

const Cart = sequelize.define(
  "Cart",
  {
    clerkId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // store items as jsonb array: [{ productId, quantity }]
    items: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    timestamps: true,
  },
)

export default Cart

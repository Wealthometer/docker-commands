import { DataTypes } from "sequelize"
import sequelize from "../db.js"

const Wishlist = sequelize.define(
  "Wishlist",
  {
    clerkId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    products: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
  },
  {
    timestamps: true,
  },
)

export default Wishlist

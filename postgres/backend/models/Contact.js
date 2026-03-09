import { DataTypes } from "sequelize"
import sequelize from "../db.js"

const Contact = sequelize.define(
  "Contact",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("new", "read", "replied"),
      defaultValue: "new",
    },
  },
  {
    timestamps: true,
    updatedAt: false,
  },
)

export default Contact

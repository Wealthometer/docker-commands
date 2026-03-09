import { DataTypes } from "sequelize"
import sequelize from "../db.js"

const User = sequelize.define(
  "User",
  {
    clerkId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    profileImage: DataTypes.STRING,
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  },
)

export default User

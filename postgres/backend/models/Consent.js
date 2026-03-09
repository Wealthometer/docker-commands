import { DataTypes } from "sequelize"
import sequelize from "../db.js"

const Consent = sequelize.define(
  "Consent",
  {
    fingerprint: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    analytics: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    marketing: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    essential: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    expiresAt: {
      type: DataTypes.DATE,
      defaultValue: () => new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
  },
  {
    timestamps: false,
  },
)

export default Consent

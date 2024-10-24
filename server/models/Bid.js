import { DataTypes } from "sequelize";
import { sequelize } from "../config/index.js";

export const Bid = sequelize.define("Bid", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

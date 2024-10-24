import { DataTypes } from "sequelize";
import { sequelize } from "../config/index.js";

import { Bid } from "./index.js";

export const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  phone: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

User.hasMany(Bid, {
  foreignKey: "user_id",
  sourceKey: "id",
});

Bid.belongsTo(User, {
  foreignKey: "user_id",
});

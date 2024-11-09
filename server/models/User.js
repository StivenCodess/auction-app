import { DataTypes } from "sequelize";
import { sequelize } from "../config/index.js";

import { Bid } from "./index.js";

export const User = sequelize.define("User", {
  uid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
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
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo_url: {
    type: DataTypes.STRING,
  },
});

User.hasMany(Bid, {
  foreignKey: "user_id",
  sourceKey: "uid",
});

Bid.belongsTo(User, {
  foreignKey: "user_id",
});

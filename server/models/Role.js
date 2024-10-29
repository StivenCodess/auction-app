import { DataTypes } from "sequelize";

import { sequelize } from "../config/index.js";
import { User } from "./User.js";

export const Role = sequelize.define("Role", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

Role.hasMany(User, { foreignKey: "role_id", sourceKey: "id" });
User.belongsTo(Role, { foreignKey: "role_id" });

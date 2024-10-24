import { DataTypes } from "sequelize";
import { sequelize } from "../config/index.js";

import { Auction } from "./index.js";

export const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

Product.belongsToMany(Auction, {
  foreignKey: "product_id",
  through: "Auction_Product",
});

Auction.belongsToMany(Product, {
  foreignKey: "auction_id",
  through: "Auction_Product",
});

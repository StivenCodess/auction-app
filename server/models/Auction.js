import { DataTypes } from "sequelize";
import { sequelize } from "../config/index.js";

import { Product, Bid } from "./index.js";

export const Auction = sequelize.define("Auction", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  starting_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

Auction.hasMany(Bid, {
  foreignKey: "auction_id",
  sourceKey: "id",
});

Bid.belongsTo(Auction, {
  foreignKey: "auction_id",
});

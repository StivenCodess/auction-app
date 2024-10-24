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

/**
 * Colocar auction_id -> esta bid pertenece a que Auction a que subasta
 * user_id -> Un usuario puede tener muchas bids
 *  Date se coloca solo
 * */

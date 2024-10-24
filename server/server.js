import { connectDB, sequelize } from "./config/index.js";
import { User, Bid, Auction, Product } from "./models/index.js";

async function main() {
  await sequelize.sync();
}

main();

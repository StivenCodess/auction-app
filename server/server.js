import express from "express";
import { connectDB, sequelize } from "./config/index.js";
import { User, Bid, Auction, Product } from "./models/index.js";

import productRoutes from "./routes/product.routes.js";

const app = express();

app.use(express.json());
app.use(productRoutes);

const main = async () => {
  await sequelize.sync({ force: false, logging: false });
  app.listen(5000);
  console.log("Server ins running on port", 5000);
};

main();

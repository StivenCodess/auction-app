import express from "express";
import { connectDB, sequelize } from "./config/index.js";

import { User, Bid, Auction, Product } from "./models/index.js";
import { productRoutes, auctionRoutes, userRoutes, bidRoutes} from "./routes/index.js"

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use("/api", productRoutes);
app.use("/api", auctionRoutes);
app.use("/api", userRoutes);
app.use("/api", bidRoutes);

const main = async () => {
  await sequelize.sync({ force: false, logging: false });
  app.listen(5000);
  console.log("Server ins running on port", 5000);
};

main();

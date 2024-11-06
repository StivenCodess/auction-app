import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import { connectDB, sequelize } from "./config/index.js";
import { User, Bid, Auction, Product, Role } from "./models/index.js";
import {
  productRoutes,
  auctionRoutes,
  userRoutes,
  bidRoutes,
} from "./routes/index.js";

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173" },
});

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", auctionRoutes);
app.use("/api", bidRoutes);

io.on("connection", (socket) => {
  console.log(`User Connected ${socket.id}`);

  socket.on("newBid", (data) => {
    console.log("New bid received:", data);
    io.emit(`auction:${data.auctionId}`, data);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const main = async () => {
  await sequelize.sync({ force: false, logging: false });

  //ADD ROLES TO DEV */;

  // await Role.bulkCreate([
  //   { name: "Admin" },
  //   { name: "User" },
  //   { name: "Manager" },
  // ]);

  server.listen(PORT);
  console.log("Server ins running on port", PORT);
};

main();

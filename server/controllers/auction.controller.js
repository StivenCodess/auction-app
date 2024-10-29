import { Auction } from "../models/index.js";

export const getAuctions = async (req, res) => {
  try {
    const auction = await Auction.findAll();
    res.status(200).json(auction);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch auction" });
  }
};

export const getAuctionByIndex = async (req, res) => {
  try {
    const { id } = req.params;
    const auction = await Auction.findByPk(id);

    if (!auction) return res.status(404).json({ error: "auction not found" });
    res.status(200).json(auction);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch auction" });
  }
};

export const createAuction = async (req, res) => {
  try {
    const { start_date, end_date, starting_price } = req.body;
    const newAuction = await Auction.create({
      start_date,
      end_date,
      starting_price,
    });

    res.status(201).json(newAuction);
  } catch (error) {
    res.status(500).json({ error: "Failed to create auction" });
  }
};

export const updateAuction = async (req, res) => {
  try {
    const { id } = req.params;
    const { start_date, end_date, starting_price } = req.body;

    const auction = await Auction.findByPk(id);
    if (!auction) return res.status(404).json({ error: "auction not found" });

    auction.update({ start_date, end_date, starting_price });
    res.status(200).json(auction);
  } catch (error) {
    res.status(500).json({ error: "Failed to update auction" });
  }
};

export const deleteAuction = async (req, res) => {
  try {
    const { id } = req.params;
    const auction = await Auction.findByPk(id);

    if (!auction) return res.status(404).json({ error: "auction not found" });
    auction.destroy();

    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to deleted auction" });
  }
};

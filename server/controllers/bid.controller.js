import { Bid } from "../models/index.js";

export const getBids = async (req, res) => {
  try {
    const bid = await Bid.findAll();
    res.status(200).json(bid);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bid" });
  }
};

export const getBidByIndex = async (req, res) => {
  try {
    const { id } = req.params;
    const bid = await Bid.findByPk(id);

    if (!bid) return res.status(404).json({ error: "bid not found" });
    res.status(200).json(bid);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bid" });
  }
};

export const createBid = async (req, res) => {
  try {
    const { amount, user_id, auction_id } = req.body;

    const newBid = await Bid.create({ amount, user_id, auction_id });
    res.status(201).json(newBid);
  } catch (error) {
    res.status(500).json({ error: "Failed to create bid" });
  }
};

export const updateBid = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, user_id, auction_id } = req.body;

    const bid = await Bid.findByPk(id);
    if (!bid) return res.status(404).json({ error: "bid not found" });

    bid.update({ amount, user_id, auction_id });
    res.status(200).json(bid);
  } catch (error) {
    res.status(500).json({ error: "Failed to update bid" });
  }
};

export const deleteBid = async (req, res) => {
  try {
    const { id } = req.params;
    const bid = await Bid.findByPk(id);

    if (!bid) return res.status(404).json({ error: "bid not found" });
    bid.destroy();

    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to deleted bid" });
  }
};

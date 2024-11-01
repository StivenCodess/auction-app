import { Product } from "../models/index.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ ok: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, error: "Failed to fetch products" });
  }
};

export const getProductByIndex = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product)
      return res.status(404).json({ ok: false, error: "Product not found" });

    res.status(200).json({ ok: true, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, error: "Failed to fetch product" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image_url, auction_id } = req.body;
    const newProduct = await Product.create({
      name,
      description,
      price,
      image_url,
      auction_id,
    });

    res.status(201).json({ ok: true, newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, error: "Failed to create product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image_url, price, auction_id } = req.body;

    const product = await Product.findByPk(id);
    if (!product)
      return res.status(404).json({ ok: false, error: "Product not found" });

    product.update({ name, description, image_url, price, auction_id });

    res.status(200).json({ ok: true, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, error: "Failed to update product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product)
      return res.status(404).json({ ok: false, error: "Product not found" });
    product.destroy();

    res.status(200).send({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, error: "Failed to deleted product" });
  }
};

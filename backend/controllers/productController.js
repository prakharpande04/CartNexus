const Product = require('../models/Product');

const createProduct = async (req, res) => {
  const { name, description, price, quantity, category, image } = req.body.product;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      quantity,
      category,
      image,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProducts = async (req, res) => {
  try {
    console.log('Fetching 10 random products from the database...');
    const products = await Product.aggregate([{ $sample: { size: 10 } }]);
    console.log('Fetched products:', products);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const searchProducts = async (req, res) => {
  const { query } = req.params;
  console.log('Search query:', query);

  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
      ],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
};

module.exports = { createProduct, getProducts, searchProducts };

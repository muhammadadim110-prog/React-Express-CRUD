const express = require('express');
const route = express.Router();
const { Category, Product } = require('../models');

route.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, as: 'category' }]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

route.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, as: 'category' }]
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

route.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    const product = await Product.findByPk(newProduct.id, {
      include: [{ model: Category, as: 'category' }]
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

route.put('/:id', async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) return res.status(404).json({ error: 'Product not found' });

    const updatedProduct = await Product.findByPk(req.params.id, {
      include: [{ model: Category, as: 'category' }]
    });

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

route.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Product not found' });

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = route;

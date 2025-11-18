const express = require('express');
const route = express.Router();
const { Category, Product } = require('../models');

route.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: [{ model: Product, as: 'products' }]
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

route.get('/:id', async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id, {
            include: [{ model: Product, as: 'products' }]
        });

        if (!category) return res.status(404).json({ message: "Data not found" });

        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

route.post('/', async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

route.put('/:id', async (req, res) => {
    try {
        const [updated] = await Category.update(req.body, {
            where: { id: req.params.id }
        });

        if (!updated)
            return res.status(404).json({ message: "Data not found" });

        const updatedData = await Category.findByPk(req.params.id);
        res.json(updatedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

route.delete('/:id', async (req, res) => {
    try {
        const deleted = await Category.destroy({
            where: { id: req.params.id }
        });

        if (!deleted)
            return res.status(404).json({ message: "Data not found" });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = route;

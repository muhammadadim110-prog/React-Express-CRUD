import express from "express";
import pkg from "../models/index.js";

const { TableUsers, TablePosts } = pkg; 

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await TableUsers.findAll({
      include: [{ model: TablePosts }]  
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await TableUsers.create({
      name: req.body.name,
      email: req.body.email
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    await TableUsers.update(
      {
        name: req.body.name,
        email: req.body.email
      },
      { where: { id: req.params.id } }
    );
    res.json({ message: "User updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await TableUsers.destroy({
      where: { id: req.params.id }
    });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

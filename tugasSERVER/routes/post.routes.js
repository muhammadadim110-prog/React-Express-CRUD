import express from "express";
import pkg from "../models/index.js";

const { TablePosts, TableUsers } = pkg;

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const posts = await TablePosts.findAll({
      include: [{ model: TableUsers }] 
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const post = await TablePosts.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.body.userId
    });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    await TablePosts.update(
      {
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId
      },
      { where: { id: req.params.id } }
    );
    res.json({ message: "Post updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await TablePosts.destroy({
      where: { id: req.params.id }
    });
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

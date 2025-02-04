const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Task = require("../models/taskModel");

const router = express.Router();

// CREATE TASK
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });

    const newTask = new Task({ user: req.user.id, title, description });
    await newTask.save();

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// GET ALL TASK USERS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// UDPATE TASK
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed !== undefined ? completed : task.completed;

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE TASK
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

const { Router } = require("express");
const { authenticateJWT } = require("../middleware/auth");
const { Task, User } = require("../db");
const router = Router();

router.post("/add", async (req, res) => {
  try {
    const { name, description, xpValue } = req.body;
    await Feature.create({
      name: name,
      description: description,
      xpValue: xpValue,
    });

    res.json({ message: "Feature created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Unable to create task" });
  }
});

router.get("/:taskId/completed", authenticateJWT, async (req, res) => {
  const taskId = req.params.taskId;
  const email = req.email;

  const task = await Task.findById(taskId);
  const user = await User.findOne({ email: email });
  if (task.completedBy.includes(user._id)) {
    return res.json({ completed: true });
  }

  return res.json({ completed: false });
});

router.post("/:taskId/complete", authenticateJWT, async (req, res) => {
  const taskId = req.params.taskId;
  const email = req.email;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    let user = await User.findOne({ email: email });
    const userId = user._id;

    // Award XP only if the task is completed by the user who didn't complete it before
    if (!task.completedBy.includes(userId)) {
      // Implement your XP calculation logic here, e.g., based on task difficulty or type
      const xpEarned = task.xpValue;

      task.completedBy.push(userId);
      await task.save();

      user.xp += xpEarned;
      await user.save();

      res.json({ user: user });
    } else {
      res.json({ message: "XP already awarded for this task" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

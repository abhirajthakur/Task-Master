const { Router } = require("express");
const { Feature, Task } = require("../db");
const router = Router();

router.get("/", async (_req, res) => {
  try {
    const features = await Feature.find({});
    res.json({ features: features });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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
    res.status(500).json({ message: "Unable to create feature" });
  }
});

router.get("/:featureId/tasks", async (req, res) => {
  const featureId = req.params.featureId;
  try {
    const feature = await Feature.findById(featureId);

    const tasks = await Task.find({
      _id: {
        $in: feature.taskIds,
      },
    });
    res.json({ tasks: tasks });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/:featureId/task", async (req, res) => {
  const featureId = req.params.featureId;
  const taskId = req.body.taskId;

  try {
    const feature = await Feature.findById(featureId);
    if (feature.taskIds.includes(taskId)) {
      return res.json({ message: "Task already included in this feature" });
    } else {
      feature.taskIds.push(taskId);
      await feature.save();
    }
    res.json({ feature: feature });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

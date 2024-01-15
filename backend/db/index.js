const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const featureSchema = new mongoose.Schema({
  name: String,
  description: String,
  xpValue: Number,
  taskIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task", default: [] }],
});

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  xpValue: { type: Number, default: 10 },
  completedBy: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
  ],
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  xp: { type: Number, default: 0 },
});

const Feature = mongoose.model("Feature", featureSchema);
const Task = mongoose.model("Task", taskSchema);
const User = mongoose.model("User", userSchema);

module.exports = { Feature, Task, User };

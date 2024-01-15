const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const tasksRouter = require("./routes/tasks");
const featuresRouter = require("./routes/features");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/tasks", tasksRouter);
app.use("/features", featuresRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

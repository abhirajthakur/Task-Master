const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const { User, Task } = require("../db");
const z = require("zod");
const dotenv = require("dotenv");
const { authenticateJWT } = require("../middleware/auth");
dotenv.config();

const emailSchema = z.string().email({ message: "Invalid email address" });
const passwordSchema = z.string().min(8);

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const emailResponse = emailSchema.safeParse(email);
  const passwordResponse = passwordSchema.safeParse(password);

  if (!emailResponse.success || !passwordResponse.success) {
    return res.status(411).json({ message: "Invalid email or password" });
  }

  const user = await User.findOne({ email: email });
  if (user) {
    res.status(403).json({ message: "User with this email already exists" });
  } else {
    User.create({
      name,
      email,
      password,
    });

    res.json({ message: "User created successfully" });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const emailResponse = emailSchema.safeParse(email);
  const passwordResponse = passwordSchema.safeParse(password);

  if (!emailResponse.success || !passwordResponse.success) {
    return res.status(411).json({ message: "Invalid email or password" });
  }

  const user = await User.findOne({
    email: email,
    password: password,
  });

  const secret = process.env.SECRET_KEY;
  if (!user) {
    res.status(411).json({ message: "Incorrect email or password" });
  } else {
    const token = jwt.sign(
      {
        email: email,
      },
      secret,
    );

    res.json({ token: token, user: user });
  }
});

router.get("/:userId/completedTasks", authenticateJWT, async (req, res) => {
  const userId = req.params.userId;

  const tasks = await Task.find({ completedBy: userId });

  if (!tasks) {
    res.status(411).json({ message: "Incorrect email or password" });
  } else {
    res.json({ tasks });
  }
});

module.exports = router;

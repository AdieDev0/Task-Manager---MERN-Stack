const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const colors = require("colors/safe");

dotenv.config();
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api/userRoutes", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/task")); // ✅ Ensure correct path

// DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(colors.green("MongoDB Connected")))
  .catch((err) => console.error(colors.red(err)));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(colors.blue(`Server running on port ${PORT}`))
);

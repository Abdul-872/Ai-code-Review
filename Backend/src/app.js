const express = require("express");
const cors = require("cors");  // ✅ ADD THIS LINE
const aiRoutes = require("./routes/ai.routes");

const app = express();

// ✅ middlewares
app.use(cors());               // ✅ NOW IT WILL WORK
app.use(express.json());

// ✅ Default route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// ✅ AI routes mount
app.use("/ai", aiRoutes);

module.exports = app;

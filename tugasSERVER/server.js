import express from "express";
import cors from "cors";
import db from "./models/index.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connect
db.sequelize
  .authenticate()
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error("DB Error: ", err.message));

// Sync DB
db.sequelize
  .sync({ alter: true })
  .then(() => console.log("DB Synced"))
  .catch((err) => console.error("Sync Error: ", err.message));

// Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// Test Endpoint
app.get("/", (req, res) => res.send("API Ready"));

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running @ http://localhost:${PORT}`));

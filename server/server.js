const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Tripora API is running");
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  if (!process.env.MONGO_URI) {
    console.error("Missing MONGO_URI. Copy server/.env.example to server/.env and add your MongoDB Atlas connection string.");
    process.exit(1);
  }
  if (!process.env.JWT_SECRET) {
    console.error("Missing JWT_SECRET. Add a long random secret to server/.env.");
    process.exit(1);
  }

  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Could not connect to MongoDB. Check MONGO_URI and Atlas network access.");
    process.exit(1);
  }
}

startServer();

// src/server.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config({ path: ".env.local" });

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mjt";

mongoose
  .connect(MONGO_URI, {
    // options are optional in newer mongoose versions
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

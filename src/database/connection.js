import mongoose from "mongoose";
import { config } from "dotenv";
config();

const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri)
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

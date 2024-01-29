import { Schema, model } from "mongoose";

const UrlSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    default: "https://api-links-8imez43ek-antonig5.vercel.app/api",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default model("Url", UrlSchema);

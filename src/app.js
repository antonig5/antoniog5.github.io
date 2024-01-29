import express from "express";
import "./database/connection.js";
import router from "./routers/url.router.js";
import cors from "cors";
import { config } from "dotenv";
config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", router);

function main() {
  try {
    app.listen(8080, () => {
      console.log("server started");
    });
  } catch (error) {
    console.log(error);
  }
}

main();

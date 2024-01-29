import { Router } from "express";
import {
  CreatedShotLink,
  GetOne,
  Getall,
} from "../controllers/url.controller.js";

const router = Router();
router.get("/", Getall);
router.get("/:id", GetOne);
router.post("/", CreatedShotLink);

export default router;

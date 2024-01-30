import { Router } from "express";
import {
  CreatedShotLink,
  GetOne,
  Getall,
  DeleteAll,
  VerifyUrl,
} from "../controllers/url.controller.js";

const router = Router();
router.get("/", Getall);
router.get("/:id", GetOne);
router.post("/", CreatedShotLink);
router.delete("/", DeleteAll);
router.post("/verify", VerifyUrl);

export default router;

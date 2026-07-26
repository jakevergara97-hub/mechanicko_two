import express from "express";
const router = express.Router();

import { getMechanic } from "../controllers/getMechanicController.js";

router.get("/:city/:barangay", getMechanic);

export default router;
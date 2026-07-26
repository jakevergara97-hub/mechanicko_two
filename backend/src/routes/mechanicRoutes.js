import express from "express";
const router = express.Router();

import { getMechanic } from "../controllers/getMechanicController.js";
import { createMechanic } from "../controllers/createMechanicController.js";

router.post("/", createMechanic);
router.get("/:city/:barangay", getMechanic);

export default router;
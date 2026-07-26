import express from "express";
const router = express.Router();

import { createMechanic } from "../controllers/createMechanicController.js";

router.post("/create", createMechanic);

export default router;
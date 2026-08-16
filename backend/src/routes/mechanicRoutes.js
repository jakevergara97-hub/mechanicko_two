import express from "express";
const router = express.Router();

import { getMechanic } from "../controllers/getMechanicController.js";
import { createMechanic } from "../controllers/createMechanicController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { me } from "../controllers/authController.js";
import { loginMechanic } from "../controllers/loginMechanicController.js";
import { editMechanicName } from "../controllers/editMechanicNameController.js";

router.post("/", createMechanic);
router.get("/:city/:barangay", getMechanic);
router.get("/me",
    authenticate,
    me
);
router.post("/login",
    loginMechanic
);
router.patch("/name", editMechanicName);

export default router;
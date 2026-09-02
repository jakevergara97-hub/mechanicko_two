import express from "express";
const router = express.Router();

import { getMechanic } from "../controllers/getMechanicController.js";
import { createMechanic } from "../controllers/createMechanicController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { me } from "../controllers/authController.js";
import { loginMechanic } from "../controllers/loginMechanicController.js";
import { updateMechanic } from "../controllers/updateMechanicController.js";
import { updateMechanicAddress } from "../controllers/updateMechanicAddressController.js";
import { updateMechanicServices } from "../controllers/updateMechanicServicesController.js";
import { getCarBrands } from "../controllers/getCarBrandsController.js";

router.post("/", createMechanic);
router.get("/:city/:barangay", getMechanic);
router.get("/me",
    authenticate,
    me
);
router.post("/login",
    loginMechanic
);

router.patch("/:id", updateMechanic);
router.patch("/:id/address", updateMechanicAddress);
router.patch("/:id/services", updateMechanicServices);

router.get("/cars", getCarBrands);

export default router;
const express = require("express");
const router = express.Router();

const {createMechanic} = require("../controllers/createMechanicController");

router.post("/create", createMechanic);

module.exports = router;
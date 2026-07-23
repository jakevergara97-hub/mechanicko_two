const express = require("express");
const router = express.Router();

// import controller and its function here
const {getMechanic} = require("../controllers/getMechanicController");

router.get("/:city/:barangay", getMechanic);

module.exports = router;
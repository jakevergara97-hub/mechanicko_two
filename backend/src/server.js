import express from "express";
import cors from "cors";
import "dotenv/config";
import pool  from "./db/db.js";

const app = express();
const PORT = 3000;

// Allows Express to read JSON from fetch requests
app.use(express.json());
app.use(cors()); // allow all origins (for development)

import mechanicRoutes from "./routes/mechanicRoutes.js"

app.use("/api/v1/mechanics", mechanicRoutes);

app.listen(PORT, () => {
    console.log("Server running...");
});
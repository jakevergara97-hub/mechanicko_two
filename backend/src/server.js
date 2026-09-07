import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mechanicRoutes from "./routes/mechanicRoutes.js"
import "dotenv/config";

const app = express();
const PORT = 3000;

// allow all origins (for development)
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// Allows Express to read JSON from fetch requests
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/mechanics", mechanicRoutes);

app.listen(PORT, () => {
    console.log("Server running...");
});
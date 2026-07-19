const express = require("express");

const app = express();
const cors = require("cors");
const PORT = 3000;

// Allows Express to read JSON from fetch requests
app.use(express.json());
app.use(cors()); // allow all origins (for development)

const createMechanicRoute = require("./routes/createMechanicRoute");

app.use("/v1/mechanic", createMechanicRoute);

/////////


app.get("/api/reverse-geocode/:lat/:lon", async (req, res) => {
    console.log("Route hit!");
    const { lat, lon } = req.params;

    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
        {
            headers: {
                "User-Agent": "MechanicKo/1.0"
                }
            }
        );

        if(!response.ok) {
            throw new Error(`Failed to get the address.`);
        }

        console.log(response.status);
        const data = await response.json();
        res.json(data);
    }
    catch(error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log("Server running...");
});
const express = require("express");

const app = express();
const cors = require("cors");
// const PORT = 3000;

let mechanics = [];
let mechanicAddress = [];
let id = 0;

// Allows Express to read JSON from fetch requests
app.use(express.json());
app.use(cors()); // allow all origins (for development)

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

// CREATE mechanic
app.post("/mechanics", (req, res) => {

    let {firstName,
        lastName,
        phoneNumber,
        province,
        }
    = req.body;

    id++;

    const mechanic = {
        id,
        firstName,
        lastName,
        phoneNumber,
    }

    mechanics.push(mechanic);

    mechanicAddress.push({
        mechanicID: id,
        province,
    })

    console.log(mechanics);
    console.log(mechanicAddress);

    res.json({
        id: mechanic.id,
        success: true
    });

});

console.log(mechanics);

app.listen(3000, () => {
    console.log("Server running...");
});
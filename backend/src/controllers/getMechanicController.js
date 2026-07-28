// import { getMechanic as getMechanicService } from "../services/createMechanicService.js";
import { getMechanic as getMechanicService } from "../services/getMechanicService.js";

export const getMechanic = async (req, res) => {
    const {city} = req.params;
    console.log("Get Mechanic Backend");
    try {
        const data = await getMechanicService(req.params);

        return res.json(data);
    } catch(error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}
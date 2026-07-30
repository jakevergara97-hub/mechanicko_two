import { getMechanic as getMechanicService } from "../services/getMechanicService.js";

export const getMechanic = async (req, res) => {
    console.log("Get Mechanic Controller reached.")
    try {
        const data = await getMechanicService(req.params);

        return res.status(200).json(data);
    } catch(error) {
        return res.status(error.status || 500).json({
            error: error.message
        });
    }
}
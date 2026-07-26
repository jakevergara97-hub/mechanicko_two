import { getMechanic as getMechanicService } from "../services/createMechanicService.js";

export const getMechanic = async (req, res) => {
    try {
        const data = await getMechanicService(req.params);

        return res.json(data);
    } catch(error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}
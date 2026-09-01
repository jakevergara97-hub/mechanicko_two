import { createMechanic as createMechanicService } from "../services/createMechanicService.js";

export const createMechanic = async (req, res) => {
    try {
        const data = await createMechanicService(req.body);
        return res.json(data);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}
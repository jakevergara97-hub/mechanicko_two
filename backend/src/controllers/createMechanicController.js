import { createMechanic as createMechanicService } from "../services/createMechanicService.js";

export const createMechanic = async (req, res) => {
    try {
        const data = await createMechanicService(req.body);

        res.json(data);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}
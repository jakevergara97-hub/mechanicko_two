import { createMechanic as createMechanicService } from "../services/createMechanicService.js";

export const createMechanic = async (req, res) => {
    try {
        console.log("CREATE MECHANIC CONTROLLER HIT!");
        const data = await createMechanicService(req.body);
        console.log(data);
        return res.json(data);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
}
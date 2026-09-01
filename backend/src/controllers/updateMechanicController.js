import { updateMechanic as updateMechanicService } from "../services/updateMechanicService.js";

export const updateMechanic = async (req, res) => {
    const { id } = req.params;
    try{
        const data = await updateMechanicService(id, req.body);

        return res.status(201).json(data);

    } catch(error) {
        return res.status(error.status || 500).json({
            error: error.message
        })
    }
}
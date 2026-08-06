import { getCurrentMechanic } from "../services/getCurrentMechanicService.js";

export const me = async (req,res) => {
    try {
        const data = await getCurrentMechanic(req.user.userId);

        return res.status(201).json(data);

    }catch(error) {
        return res.status(error.status || 500).json({
            error: error.message
        })
    }
}
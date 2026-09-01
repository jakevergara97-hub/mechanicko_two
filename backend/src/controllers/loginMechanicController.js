import { loginMechanic as loginMechanicService } from "../services/loginMechanicService.js";

export const loginMechanic = async (req, res) => {
    try{
        const data = await loginMechanicService(req.body);

        return res.status(200).json(data);

    }catch(error){
        return res.status(error.status || 500).json({
            error: error.message
        });
    }
}
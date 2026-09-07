import { loginMechanic as loginMechanicService } from "../services/loginMechanicService.js";

export const loginMechanic = async (req, res) => {
    try{
        const data = await loginMechanicService(req.body);

        // return res.status(200).json(data);

        // Backend puts it in an HttpOnly cookie
        res.cookie("token", data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.json(data.success);

    }catch(error){
        return res.status(error.status || 500).json({
            error: error.message
        });
    }
}
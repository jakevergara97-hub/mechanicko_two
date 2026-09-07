import { createMechanic as createMechanicService } from "../services/createMechanicService.js";
import "dotenv/config";

export const createMechanic = async (req, res) => {
    try {
        const data = await createMechanicService(req.body);
        console.log(data);

        // Backend puts it in an HttpOnly cookie
        res.cookie("token", data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.json(data.success);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}
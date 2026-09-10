import "dotenv/config";

export const logoutMechanic = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/"
    });

    return res.json({
        success: true,
        message: "Logged out successfully"
    });
}
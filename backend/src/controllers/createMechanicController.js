const createMechanicService = require("../services/createMechanicService");

const createMechanic = async(req, res) => {
    try {
        const data = await createMechanicService.createMechanic(req.body);

        res.json(data);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

module.exports = {
    createMechanic
};
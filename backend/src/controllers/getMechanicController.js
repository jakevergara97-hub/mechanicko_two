// import service here
const createMechanicService = require("../services/createMechanicService");

const getMechanic = async (req, res) => {
    console.log("Controller hit!", req.params);

    try {
        const data = await createMechanicService.getMechanic(req.params);

        return res.json(data);
    } catch(error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

module.exports = {
    getMechanic
}
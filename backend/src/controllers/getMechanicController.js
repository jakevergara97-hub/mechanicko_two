// import service here
const createMechanicService = require("../services/createMechanicService");

const getMechanic = async (req, res) => {
    // const { province, city, barangay } = req.params;
    try {
        const data = await createMechanicService.getMechanic(req.params);

        res.json(data);
    } catch(error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

module.exports = {
    getMechanic
}
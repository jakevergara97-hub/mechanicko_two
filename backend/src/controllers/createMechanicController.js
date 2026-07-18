const createMechanicService = require("../services/createMechanicService");

const createMechanic = async(req, res) => {
    // let {firstName,
    //     lastName,
    //     phoneNumber,
    //     email,
    //     province,
    //     city,
    //     barangay,
    //     }
    // = req.body;
    console.log('Backend createMechanic hits')
    const data = await createMechanicService.createMechanic(req.body);

    res.json(data);
}

module.exports = {
    createMechanic
};
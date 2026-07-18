let id = 0;
const mechanics = [];

const createMechanic = async (mechanicData) => {
    let {firstName,
        lastName,
        phoneNumber,
        email,
        province,
        city,
        barangay,
        }
    = mechanicData;

    id++;

    mechanics.push({
        mechanicID: id,
        firstName,
        lastName,
        phoneNumber,
        email,
        province,
        city,
        barangay,
    });

    return {
        id,
        firstName: mechanicData.firstName,
        success: true,
    }
}

console.log(mechanics);

module.exports = {
    createMechanic
};
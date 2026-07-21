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
    console.log(mechanics);
}

const getMechanic = async (locationData) => {
    const { province, city, barangay} = locationData;

    const selectedMechanics = mechanics.filter(mechanic => mechanic.province === province);
    console.log(selectedMechanics);
    return selectedMechanics;
}


module.exports = {
    createMechanic,
    getMechanic
};
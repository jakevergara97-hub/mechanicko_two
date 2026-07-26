import pool from '../db/db.js';

export const createMechanic = async (mechanicData) => {
    let {firstName,
        lastName,
        phoneNumber,
        email,
        province,
        city,
        barangay,
        }
    = mechanicData;

    if (!firstName ||
        !lastName ||
        !phoneNumber ||
        !email ||
        !province ||
        !city ||
        !barangay
    ) {
        throw new Error("Missing required fields");
    }

    try {
        const result = await pool.query(
            `INSERT INTO mechanics (first_name, last_name, phone_number, email)
            VALUES ($1, $2, $3, $4)
            RETURNING *
            `, [firstName, lastName, phoneNumber, email]
        );

        return {
            success: true,
            message: "Mechanic added successfully",
            mechanic: result.rows[0]
        }

    }catch(error) {
        throw error;
    }
}

// let id = 0;
// const mechanics = [];

// export const createMechanic = async (mechanicData) => {
//     let {firstName,
//         lastName,
//         phoneNumber,
//         email,
//         province,
//         city,
//         barangay,
//         }
//     = mechanicData;

//     id++;

//     mechanics.push({
//         mechanicID: id,
//         firstName,
//         lastName,
//         phoneNumber,
//         email,
//         province,
//         city,
//         barangay,
//     });
//     console.log(mechanics);

//     return {
//         id,
//         firstName: mechanicData.firstName,
//         province: mechanicData.province,
//         city: mechanicData.city,
//         barangay: mechanicData.barangay,
//         success: true,
//     }

// }

export const getMechanic = async (locationData) => {
    const { province, city, barangay} = locationData;

    console.log("Get Mechanic on Server Hit!");

    const selectedMechanics = mechanics.filter(mechanic => mechanic.city === city);
    console.log(selectedMechanics);
    return selectedMechanics;
}


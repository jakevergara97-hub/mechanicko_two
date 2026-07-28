import pool from '../db/db.js';

export const createMechanic = async (mechanicData) => {
    let {firstName,
        lastName,
        phoneNumber,
        email,
        region,
        province,
        city,
        barangay,
        }
    = mechanicData;

    try {
        for(const [key, value] of Object.entries(mechanicData)) {
            if(key === 'province') {
                continue;
            }

            if(value === '') {
                throw new Error("Missing required fields");
            }
        }

        const mechanicResult = await pool.query(
            `INSERT INTO mechanics (first_name, last_name, phone_number, email)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [firstName, lastName, phoneNumber, email]
        );

        const mechanic = mechanicResult.rows[0];

        const addressResult = await pool.query(
            `INSERT INTO mechanics_address (mechanic_id, province, city, barangay, region)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING region, province, city, barangay`,
            [mechanic.mechanic_id, province, city, barangay, region]
        );

        const mechanicAddress = addressResult.rows[0];

        return {
            success: true,
            message: "Mechanic added successfully",
            mechanic,
            mechanicAddress
        }

    }catch(error) {
        throw error;
    }
}

////

// export const getMechanic = async (locationData) => {
//     const { province, city, barangay} = locationData;

//     console.log("Get Mechanic on Server Hit!");

//     const selectedMechanics = mechanics.filter(mechanic => mechanic.city === city);
//     console.log(selectedMechanics);
//     return selectedMechanics;
// }


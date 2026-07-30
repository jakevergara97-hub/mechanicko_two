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
                throw {
                    status: 400,
                    message: "Missing required field/s"
                }
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
            `INSERT INTO mechanics_addresses (mechanic_id, province, city, barangay, region)
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


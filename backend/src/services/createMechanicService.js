import pool from '../db/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createMechanic = async (mechanicData) => {
    let {firstName,
        lastName,
        phoneNumber,
        email,
        password,
        region,
        province,
        city,
        barangay,
        }
    = mechanicData;

    try {
        const existingUser = await pool.query(`
                SELECT *
                FROM mechanics_auth
                WHERE email = $1
            `,[email]);

        if(existingUser.rows.length > 0) {
            throw {
                status: 409,
                message: "Mechanic already registered"
            }
        }

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

        const hashedPassword = await bcrypt.hash(password, 10)

        const mechanicResult = await pool.query(
            `INSERT INTO mechanics_auth (email, password_hash)
            VALUES ($1, $2)
            RETURNING *`,
            [email, hashedPassword]
        );

        const mechanic = mechanicResult.rows[0];

        const profileResult = await pool.query(
            `INSERT INTO mechanics_profiles(mechanic_id, first_name, last_name, phone_number)
            VALUES ($1, $2, $3, $4)
            RETURNING first_name, last_name, phone_number
            `, [mechanic.id, firstName, lastName, phoneNumber]
        );

        const mechanicProfile = profileResult.rows[0];

        const addressResult = await pool.query(
            `INSERT INTO mechanics_addresses(mechanic_id, region, province, city, barangay)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING region, province, city, barangay`,
            [mechanic.id, region, province, city, barangay]
        );

        const mechanicAddress = addressResult.rows[0];

        return {
            success: true,
            message: "Mechanic added successfully",
            mechanicID: mechanic.id,
            mechanicEmail: mechanic.email,
            mechanicProfile,
            mechanicAddress
        }

    }catch(error) {
        throw error;
    }
}


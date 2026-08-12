import pool from '../db/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import "dotenv/config";

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
        const existingMechanic = await pool.query(`
                SELECT *
                FROM mechanics_auth
                WHERE email = $1
            `,[email]);

        if(existingMechanic.rows.length > 0) {
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
            VALUES ($1, $2, $3, $4)`,
            [mechanic.id, firstName, lastName, phoneNumber]
        );

        const addressResult = await pool.query(
            `INSERT INTO mechanics_addresses(mechanic_id, region, province, city, barangay)
            VALUES ($1, $2, $3, $4, $5)`,
            [mechanic.id, region, province, city, barangay]
        );

        const token = jwt.sign(
            {
                userId:mechanic.id,
                email:mechanic.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1h"
            }
        );

        return {
            success: true,
            message: "Mechanic added successfully",
            token
        }

    }catch(error) {
        throw error;
    }
}


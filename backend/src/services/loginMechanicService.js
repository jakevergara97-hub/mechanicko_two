import pool from '../db/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import "dotenv/config";

export const loginMechanic = async (credentials) => {
    const { email, password } = credentials;
    console.log(email);
    try{
        const existingMechanic = await pool.query(`
            SELECT
                *
            FROM mechanics_auth mau
            JOIN mechanics_profiles mp
            ON mau.id = mp.mechanic_id
            JOIN mechanics_addresses ma
            ON mau.id = ma.mechanic_id
            WHERE mau.email = $1
        `,[email]);

        const mechanic = existingMechanic.rows[0];
        console.log(mechanic);

        if(mechanic.length === 0) {
            throw {
                status: 404,
                message: "Mechanic not found"
            }
        }

        const isMatch = await bcrypt.compare(password, mechanic.password_hash);
        console.log(isMatch);

        if(!isMatch) {
            throw {
                status: 401,
                message: "Wrong email or password"
            }
        }

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
            token
        }

    }catch(error) {
        throw error;
    }
}
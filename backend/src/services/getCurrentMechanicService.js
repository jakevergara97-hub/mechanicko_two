import pool from '../db/db.js';

export const getCurrentMechanic = async (mechanicId) => {
    try{
        if(!mechanicId) {
            throw {
                status: 400,
                message: "Mechanic not found"
            }
        }

        const result = await pool.query(
            `SELECT
                mau.email,
                mp.first_name,
                mp.last_name,
                mp.phone_number,
                ma.region,
                ma.province,
                ma.city,
                ma.barangay
            FROM mechanics_auth mau
            LEFT JOIN mechanics_addresses ma
            ON mau.id = ma.mechanic_id
            LEFT JOIN mechanics_profiles mp
            ON mau.id = mp.mechanic_id
            WHERE mau.id = $1`,
            [mechanicId]
        );

        const mechanics = result.rows[0];

        return {
            success: true,
            mechanics
        }

    }catch(error) {
        throw error;
    }
}
import pool from '../db/db.js';

export const getCurrentMechanic = async (mechanicId) => {
    try{
        if(!mechanicId) {
            throw {
                status: 400,
                message: "Mechanic does not exist"
            }
        }
        // FUTURE CHANGE:
        // Create a query to fetch the mechanic ID from the database
        // then use it to fetch the mechanics data from the DB
        const result = await pool.query(
            `SELECT
                mau.id,
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

        const mechanic = result.rows[0];

        const mechanicInfo = {
            id: mechanic.id,
            first_name: mechanic.first_name,
            last_name: mechanic.last_name,
            email: mechanic.email,
            phone_number: mechanic.phone_number,
            region: mechanic.region,
            province: mechanic.province,
            city: mechanic.city,
            barangay: mechanic.barangay
        }

        return {
            success: true,
            mechanicInfo
        }

    }catch(error) {
        throw error;
    }
}
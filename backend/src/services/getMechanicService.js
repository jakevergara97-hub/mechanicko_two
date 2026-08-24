import pool from '../db/db.js';

export const getMechanic = async (location) => {
    const { city, barangay } = location;

    try{
        if(!location) {
            throw {
                status: 400,
                message: "Location required"
            }
        }

        for(const loc of Object.values(location)) {
            if(!loc) {
                throw {
                    status: 400,
                    message: "Missing required field/s"
                }
            }
        }

        const query = `
                SELECT
                    mau.email,
                    mau.id,
                    mp.first_name,
                    mp.last_name,
                    mp.phone_number,
                    ma.region,
                    ma.province,
                    ma.city,
                    ma.barangay
                FROM mechanics_auth mau
                JOIN mechanics_addresses ma
                ON mau.id = ma.mechanic_id
                JOIN mechanics_profiles mp
                ON mau.id = mp.mechanic_id
                WHERE ma.city = $1
                ORDER BY ma.barangay ASC
            `;

        const values = [city]

        const result = await pool.query(query, values);

        const mechanics = result.rows;

        if(mechanics.length === 0) {
            throw {
                status: 404,
                message: "No mechanics were found in your selected location."
            }
        }

        return {
            success: true,
            message: "Mechanics data",
            mechanics
        }

    }catch(error) {
        throw error;
    }
}
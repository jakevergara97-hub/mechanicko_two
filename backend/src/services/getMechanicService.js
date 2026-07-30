import pool from '../db/db.js';

export const getMechanic = async (location) => {
    // const { region, province, city, barangay } = location;
    const { city, barangay } = location;
    console.log(location);
    console.log("get mechanic service reached.")
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

        const result = await pool.query(
            `SELECT
                m.first_name,
                m.last_name,
                m.email,
                m.phone_number,
                m.mechanic_id,
                ma.region,
                ma.province,
                ma.city,
                ma.barangay
            FROM mechanics m
            LEFT JOIN mechanics_addresses ma
                ON m.mechanic_id = ma.mechanic_id
            WHERE city = $1`,
            [city]
        );

        // console.log(city);

        const mechanics = result.rows;

        if(mechanics.length === 0) {
            throw {
                status: 404,
                message: "No mechanics were found for your selected location."
            }
        }

        // const mechanics = result.rows;

        // console.log(mechanics);

        return {
            success: true,
            message: "Mechanics data",
            mechanics
        }

    }catch(error) {
        throw error;
    }
}
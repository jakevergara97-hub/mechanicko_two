import pool from '../db/db.js';

export const getMechanic = async (location) => {
    const { region, province, city, barangay } = location;

    try{
        const result = await pool.query(
            `SELECT
                m.first_name,
                m.last_name,
                m.email,
                m.phone_number,
                m.mechanic_id
            FROM mechanics m
            INNER JOIN mechanics_address ma
                ON m.mechanic_id = ma.mechanic_id
            WHERE city = $1`,
            [city]
        );

        const mechanics = result.rows;

        console.log(mechanics);

        return {
            success: true,
            message: "Mechanics data",
            mechanics
        }

    }catch(error) {
        throw error;
    }
}
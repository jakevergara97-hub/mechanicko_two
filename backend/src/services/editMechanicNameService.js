import pool from '../db/db.js';

export const editMechanicName = async (fullName) => {
    const {id, firstName, lastName} = fullName;

    try{
        const result = await pool.query(`
                SELECT id
                FROM mechanics_auth mau
                WHERE mau.id = $1
            `,[id]);

        const mechanicID = result.rows[0].id;

        console.log(mechanicID);

        if(!mechanicID) {
            throw {
                status: 404,
                message: "Mechanic does not exist"
            }
        }

        const resultMechanic = await pool.query(`
                UPDATE mechanics_profiles
                SET first_name = $1,
                    last_name = $2
                WHERE mechanics_profile_id = $3
                RETURNING first_name, last_name
            `,[firstName, lastName, mechanicID]);

        const data = resultMechanic.rows[0];

        return {
            success: true,
            data
        }

    } catch(error) {
        throw error;
    }

}
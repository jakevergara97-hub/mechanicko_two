import pool from "../db/db.js";

export const editMechanicNumber = async (number) => {
    const {id, phoneNumber} = number;
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

        const updatedPhoneNumber = await pool.query(`
                UPDATE mechanics_profiles mp
                SET phone_number = $1
                WHERE mp.mechanic_id = $2
                RETURNING phone_number
            `,[phoneNumber, mechanicID]);

        const data = updatedPhoneNumber.rows[0];

        console.log(data);

        return {
            success: true,
            data
        }

    } catch(error) {
        throw error;
    }
}
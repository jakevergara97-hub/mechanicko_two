import pool from '../db/db.js';

export const updateMechanic = async (id, updates) => {
    const {
            firstName,
            lastName,
            phoneNumber,
            email }
            = updates;

    try{
        const allowedFields = {
            "first_name": firstName,
            "last_name": lastName,
            "phone_number": phoneNumber,
            "email": email,
        }

        const fields = [];
        const values = [];

        const allowedFieldsKeys = Object.keys(allowedFields);

        for(const key of allowedFieldsKeys) {
            if(allowedFields[key] !== undefined) {
                fields.push(key);
                values.push(allowedFields[key]);
            }
        }

        values.push(id);

        if(fields.length === 0) {
            throw {
                status: 400,
                message: "No valid fields to update"
            }
        }

        const setClause = fields
            .map((field, index) => `${field} = $${index + 1}`)
            .join(", ");

        const returnValues = fields
            .map((field) => `${field}`)
            .join(", ");

        const query = `
            UPDATE mechanics_profiles mp
            SET ${setClause}
            WHERE mp.mechanic_id = $${values.length}
            RETURNING ${returnValues}
            `;

        const queryForEmail = `
            UPDATE mechanics_auth mau
            SET ${setClause}
            WHERE mau.id = $${values.length}
            RETURNING ${returnValues}
            `;

        const finalQuery = fields.includes('email') ? queryForEmail : query;

        const result = await pool.query(finalQuery, values);

        const data = result.rows[0];

        if(data.length === 0) {
            throw {
                status: 404,
                message: "Mechanic not found"
            }
        }

        return {
            success: true,
            data
        }

    } catch(error) {
        throw error;
    }

}
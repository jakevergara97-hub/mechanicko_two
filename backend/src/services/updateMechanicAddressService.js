import pool from '../db/db.js';

export const updateMechanicAddress = async (id, updates) => {
    const {region, province, city, barangay} = updates;
    try{
        const allowedFields = [
            'region',
            'province',
            'city',
            'barangay'
        ];

        // region = $1
        // province = $2

        const fields = [];
        const values = [];

        for(const field of allowedFields) {
            if(updates[field] !== undefined) {
                fields.push(field);
                values.push(updates[field]);
            }
        }

        values.push(id);
        console.log(values);
        console.log(id);
        const setClause = fields
            .map((field, index) => `${field} = $${index + 1}`)
            .join(", ");

        const returnValues = fields
            .map((field) => `${field}`)
            .join(", ");
        // RETURNING region, province, barangay, city
        const query = `
                UPDATE mechanics_addresses ma
                SET ${setClause}
                WHERE ma.mechanic_id = $${values.length}
                RETURNING ${returnValues}
            `;

        const result = await pool.query(query, values);

        const mechanic = result.rows[0];

        return {
            success: true,
            mechanic
        }

    }catch(error) {
        throw error;
    }
}
import pool from '../db/db.js';

export const updateMechanicServices = async (id, updates) => {
    // console.log(updates);
    const services = updates;
    // console.log(services);
    try{

        const result = await pool.query(
            `
                SELECT
                    ms.services
                FROM mechanics_services ms
                WHERE ms.mechanic_id = $1
            `,[id]
        );

        const oldServices = result.rows.map((row) => row.services);

        const newServices = services.filter((service) => !oldServices.includes(service));

        console.log(newServices);

        if(newServices.length === 0) {
            throw {
                error: 404,
                message: "Duplicate service detected."
            }
        }

        const valuesClause = newServices
            .map((_,index) => `($${index * 2 + 1}, $${index * 2 + 2})`)
            .join(", ");

        console.log(valuesClause);

        const queryToInsert = `
            INSERT INTO mechanics_services(mechanic_id, services)
            VALUES ${valuesClause}
            RETURNING *
        `;

        const valuesToInsert = newServices.map((serv) => [id, serv]);

        console.log(valuesToInsert);

        const insertResult = await pool.query(queryToInsert, valuesToInsert.flat());

        const finalServicesResult = await pool.query(
            `
                SELECT
                    ms.services
                FROM mechanics_services ms
                WHERE ms.mechanic_id = $1
            `,[id]
        );

        const updateServices = finalServicesResult.rows.map((row) => row.services);

        return {
            success: true,
            updateServices
        }


    } catch(error) {
        throw error;
    }
}
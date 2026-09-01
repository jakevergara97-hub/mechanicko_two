import pool from '../db/db.js';

export const updateMechanicServices = async (id, services) => {
    try{
        const result = await pool.query(
            `
                SELECT
                    ms.services
                FROM mechanics_services ms
                WHERE ms.mechanic_id = $1
            `,[id]
        );

        const currentServices = result.rows.map((row) => row.services);
        const newServices = services.filter((service) => !currentServices.includes(service));
        const servicesToDelete = currentServices.filter((service) => !services.includes(service));

        if(newServices.length !== 0) {
            const valuesClause = newServices
            .map((_,index) => `($${index * 2 + 1}, $${index * 2 + 2})`)
            .join(", ");

            const queryToInsert = `
                INSERT INTO mechanics_services(mechanic_id, services)
                VALUES ${valuesClause}
                RETURNING *
            `;

            const valuesToInsert = newServices.map((serv) => [id, serv]);

            const insertResult = await pool.query(queryToInsert, valuesToInsert.flat());
        }

        if(servicesToDelete.length !== 0) {
            const inClause = servicesToDelete
                .map((_, index) => `($${index * 2 + 1}, $${index * 2 + 2})`)
                .join(", ");

            const query = `
                DELETE FROM mechanics_services
                WHERE (mechanic_id, services) IN (${inClause})
            `;

            const valuesToDelete = servicesToDelete.map((service) => [id, service]);

            const result = await pool.query(query, valuesToDelete.flat());
        }

        const finalServicesResult = await pool.query(
            `
                SELECT
                    ms.services
                FROM mechanics_services ms
                WHERE ms.mechanic_id = $1
            `,[id]
        );

        const updatedServices = finalServicesResult.rows.map((row) => row.services);

        return {
            success: true,
            updatedServices
        }

    } catch(error) {
        throw error;
    }
}
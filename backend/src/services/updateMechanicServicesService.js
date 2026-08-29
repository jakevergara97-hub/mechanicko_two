import pool from '../db/db.js';

export const updateMechanicServices = async (id, updates) => {
    // console.log(updates);
    const services = updates;
    // console.log(services);
    try{

        // const setClause = services
        //     .map((_, index) =>
        //         `services = $${index + 1}`)
        //     .join(", ");

        // UPDATE table_name
        // SET column1 = value1, column2 = value2
        // WHERE condition;

        //

        // console.log(setClause);

        // VALUES ($1, $2, ...)
        // services.push(id);

        const valueClause = services
            .map((_, index) => `$${index + 1}`)
            .join(", ");

        // const query2 = `
        //     INSERT INTO mechanics_services(services, mechanic_id)
        //     VALUES ${valueClause}
        //     RETURNING services
        // `

        console.log(`(${valueClause})`);
        console.log(updates);
        console.log(updates.length);
        const servicessss = services.map((service, index) => `services`).join(", ");
        console.log(servicessss);

        const servicesNames = services
            .map((service) => service)
            .join(", ");

        console.log(servicesNames);

        const result = await pool.query(
            `
                INSERT INTO mechanics_services(${servicessss}, mechanic_id)
                VALUES (${valueClause}, $${updates.length + 1})
                RETURNING services
            `,['Tire Change',  'General Auto Repair', 'Brake Repair', 'Engine Repair', 'Preventive Maintenance', 'Battery Replacement', 'Oil Change', 'PMS', id]
        );

        console.log(result.rows);

        // const profileResult = await pool.query(
        //     `INSERT INTO mechanics_profiles(mechanic_id, first_name, last_name, phone_number)
        //     VALUES ($1, $2, $3, $4)`,
        //     [mechanic.id, firstName, lastName, phoneNumber]
        // );

        // const query = `
        //     UPDATE mechanics_services ms
        //     SET ${setClause}
        //     WHERE ms.mechanic_id = $${updates.length + 1}
        //     RETURNING ms.services
        // `;

        // const result = await pool.query(query2, services);

        // console.log(result.rows)



    } catch(error) {
        throw error;
    }
}
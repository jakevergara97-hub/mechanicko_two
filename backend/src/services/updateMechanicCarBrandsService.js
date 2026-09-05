import pool from '../db/db.js';

export const updateMechanicCarBrands = async (id, carBrands) => {
    try{
        const result = await pool.query(
            `SELECT
                mcb.brands
            FROM mechanics_car_brands mcb
            WHERE mcb.mechanic_id = $1
            `,[id]
        );

        const currentCarBrands = result.rows.map((row) => row.brands);
        const newCarBrands = carBrands.filter((brand) => !currentCarBrands.includes(brand));
        const carBrandsToDelete = currentCarBrands.filter((brand) => !carBrands.includes(brand));

        if(newCarBrands.length !== 0) {
            const valuesClause = newCarBrands
                .map((_, index) => `($${index * 2 + 1}, $${index * 2 + 2})`)
                .join(", ");

            const query =
            `
                INSERT INTO mechanics_car_brands(mechanic_id, brands)
                VALUES ${valuesClause}
                RETURNING *
            `;

            const values = newCarBrands.map((brand) => [id, brand]);

            const insertedCarBrands = await pool.query(query, values.flat());
        }

        if(carBrandsToDelete.length !== 0) {
            const inClause = carBrandsToDelete
                .map((_, index) => `($${index * 2 + 1}, $${index * 2 + 2})`)
                .join(", ");

            const query =
                `
                    DELETE FROM mechanics_car_brands
                    WHERE (mechanic_id, brands) IN (${inClause})
                `

            const valuesToDelete = carBrandsToDelete.map((service) => [id, service]);

            const result = await pool.query(query, valuesToDelete.flat());
        }

        const finalCarBrandsResult = await pool.query(
            `SELECT
                mcb.brands
            FROM mechanics_car_brands mcb
            WHERE mcb.mechanic_id = $1
            `,[id]
        );

        const updatedCarBrands = finalCarBrandsResult.rows.map((row) => row.brands);

        return {
            success: true,
            updatedCarBrands
        }

    } catch(error) {
        throw error;
    }
}
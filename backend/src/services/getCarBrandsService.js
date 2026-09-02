import pool from '../db/db.js';

export const getCarBrands = async () => {
    try {
        const query = `
            SELECT
                brands
            FROM car_brands
        `;

        const result = await pool.query(query);

        const brands = result.rows.map((row) => row.brands);

        if(brands.length === 0) {
            throw {
                status: 404,
                message: 'Car brands not found'
            }
        }

        return {
            success: true,
            brands
        }
    } catch(error) {
        throw error;
    }

}
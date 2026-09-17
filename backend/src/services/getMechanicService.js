import pool from '../db/db.js';

export const getMechanic = async (location, pagination) => {
    const { city, barangay } = location;
    const { page, limit } = pagination;
    try{
        if(!location) {
            throw {
                status: 400,
                message: "Location required"
            }
        }

        for(const loc of Object.values(location)) {
            if(!loc) {
                throw {
                    status: 400,
                    message: "Missing required field/s"
                }
            }
        }

        const currentPage = Number(page) || 1;
        const currentLimit = Number(limit) || 10;
        const offset = (page - 1) * currentLimit;

        // This queries all the mechanics in the city
        const cityMechanicsQuery = `
                SELECT
                    mau.email,
                    mau.id,
                    mp.first_name,
                    mp.last_name,
                    mp.phone_number,
                    ma.region,
                    ma.province,
                    ma.city,
                    ma.barangay
                FROM mechanics_auth mau
                JOIN mechanics_addresses ma
                ON mau.id = ma.mechanic_id
                JOIN mechanics_profiles mp
                ON mau.id = mp.mechanic_id
                WHERE ma.city = $1
                ORDER BY ma.barangay ASC
            `;

        const cityValue = [city];

        const resultCityMechanics = await pool.query(cityMechanicsQuery, cityValue);
        const cityMechanics = resultCityMechanics.rows;
        const totalCityMechanics = cityMechanics.length;

        if(totalCityMechanics === 0) {
            throw {
                status: 404,
                message: "No mechanics were found in your selected city/town."
            }
        }

        const totalMechanicsSameBarangayQuery = `
            SELECT
                COUNT(*)
            FROM mechanics_auth mau
            JOIN mechanics_addresses ma
            ON mau.id = ma.mechanic_id
            JOIN mechanics_profiles mp
            ON mau.id = mp.mechanic_id
            WHERE ma.barangay = $1
        `;

        const barangayValue = [barangay];
        const resultSameBarangay = await pool.query(totalMechanicsSameBarangayQuery, barangayValue);
        const totalSameBarangay = resultSameBarangay.rows[0].count;

        const paginatedMechanicsQuery  = `
            SELECT
                mau.email,
                mau.id,
                mp.first_name,
                mp.last_name,
                mp.phone_number,
                ma.region,
                ma.province,
                ma.city,
                ma.barangay
            FROM mechanics_auth mau
            JOIN mechanics_addresses ma
            ON mau.id = ma.mechanic_id
            JOIN mechanics_profiles mp
            ON mau.id = mp.mechanic_id
            WHERE ma.city = $1
            ORDER BY
                CASE
                    WHEN ma.barangay = $2 THEN 0
                    ELSE 1
                END
            OFFSET $3
            LIMIT $4
        `;
        const paginatedMechanicsValues  = [cityValue, barangayValue, offset, limit];

        const paginatedMechanicsResult = await pool.query(
            paginatedMechanicsQuery,
            paginatedMechanicsValues.flat()
        );

        const paginatedMechanics = paginatedMechanicsResult.rows;

        const totalPages = Math.ceil(totalCityMechanics / currentLimit);

        return {
            success: true,
            message: "Mechanics data",
            mechanics: paginatedMechanics,
            totalCityMechanics,
            totalPages,
            currentPage,
            totalSameBarangay
        }

    }catch(error) {
        throw error;
    }
}
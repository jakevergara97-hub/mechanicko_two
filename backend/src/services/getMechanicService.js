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
        // console.log(currentPage)
        const currentLimit = Number(limit) || 10;
        // console.log(currentLimit);

        const offset = (page - 1) * currentLimit;
        // console.log(offset);

        const mechanicsQuery = `
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

        const resultMechanics = await pool.query(mechanicsQuery, cityValue);

        const mechanics = resultMechanics.rows;

        if(mechanics.length === 0) {
            throw {
                status: 404,
                message: "No mechanics were found in your selected location."
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

        const totalMechanicsCityQuery = `
            SELECT
                COUNT(*)
            FROM mechanics_auth mau
            JOIN mechanics_addresses ma
            ON mau.id = ma.mechanic_id
            JOIN mechanics_profiles mp
            ON mau.id = mp.mechanic_id
            WHERE ma.city = $1
        `;

        const barangayValue = [barangay];
        const resultSameBarangay = await pool.query(totalMechanicsSameBarangayQuery, barangayValue);
        const totalSameBarangay = resultSameBarangay.rows[0].count;
        console.log(totalSameBarangay);

        const resultTotalMechanicsCity = await pool.query(totalMechanicsCityQuery, cityValue);
        const totalCityMechanics = resultTotalMechanicsCity.rows[0].count;
        console.log(totalCityMechanics);

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
            ORDER BY ma.barangay ASC
            LIMIT $2
            OFFSET $3
        `;

        const paginatedMechanicsValues  = [cityValue, limit, offset];

        const paginatedMechanicsResult  = await pool.query(
            paginatedMechanicsQuery,
            paginatedMechanicsValues.flat()
        );

        const paginatedMechanics = paginatedMechanicsResult.rows;
        // console.log(paginatedMechanicsResult.rows);

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
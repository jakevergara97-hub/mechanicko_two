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
        console.log(currentLimit);

        const offset = (page - 1) * currentLimit;
        console.log(offset);

        const query = `
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


        const result = await pool.query(query, cityValue);

        const mechanics = result.rows;

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

        const query2witOffset = `
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

        const query2Values = [cityValue, limit, offset];

        const resultWithOffset = await pool.query(query2witOffset, query2Values);
        // console.log(resultWithOffset);

        // How to compute the OFFSET?

        // How can I select the mechanics in the same barangay?

        // RETURN DESIGN
        // {
        //     mechanics: [...], -> all the mechanics
        //     totalMechanics: 35, -> totalCityMechanics
        //     totalPages: 4, -> offset
        //     currentPage: 2, -> page
        //     totalSameBarangay: 15 -> totalSameBarangay
        // }

        // const totalPages = Math.ceil(totalCityMechanics / 10);
        // Where 10 is the limit
        const totalPages = Math.ceil(totalCityMechanics / currentLimit);

        // return {
        //     success: true,
        //     message: "Mechanics data",
        //     mechanics
        // }

        return {
            success: true,
            message: "Mechanics data",
            mechanics,
            totalCityMechanics,
            totalPages,
            currentPage,
            totalSameBarangay
        }

    }catch(error) {
        throw error;
    }
}
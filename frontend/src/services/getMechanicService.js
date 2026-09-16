export async function getMechanic(location, page, limit) {
    const { city, barangay } = location;
    console.log(city);
    console.log(barangay);
    console.log(page);
    console.log(limit);
// export async function getMechanic(location) {
//     const { city, barangay } = location;
    try {
        const response = await fetch(
            `http://localhost:3000/api/v1/mechanics/${encodeURIComponent(city)}/${encodeURIComponent(barangay)}?page=${page}&limit=${limit}`
        );

        // const response = await fetch(
        //     `http://localhost:3000/api/v1/mechanics/${encodeURIComponent(city)}/${encodeURIComponent(barangay)}`
        // );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }
        console.log(data);
        return data;

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}
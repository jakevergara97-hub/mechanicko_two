export async function getMechanic(location) {
    const { city, barangay } = location;

    // const slicedCity = city.includes("(Capital)")
    //     ? city.replace(" (Capital)", "")
    //     : city;

    // console.log(`Fetching... ${slicedCity}, ${barangay}`);

    console.log(`Fetching... ${city}, ${barangay}`);

    try {
        const response = await fetch(
            `http://localhost:3000/api/v1/mechanics/${encodeURIComponent(city)}/${encodeURIComponent(barangay)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }

        return data;

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}
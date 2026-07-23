export async function getMechanic(location) {
    const { province, city, barangay } = location;
    const slicedCity = city.includes('(Capital)') ? city.replace(' (Capital)', '') : city;
    console.log(`Fetching... ${slicedCity}, ${barangay}`);

    try{
        const response = await fetch(`http://localhost:3000/v1/mechanic/${slicedCity}/${barangay}`);

        if(!response.ok) {
            throw new Error(response.status);
        }

        const data = await response.json();
        console.log(data);
        return data;
    }catch(error) {
        console.error(error.message);
    }
}
export async function getCustomerLocation() {
    const lat = 13.759967;
    const lon = 121.072737;

    try {
        const response = await fetch(`http://localhost:3000/api/reverse-geocode/${lat}/${lon}`);

        if(!response.ok) {
            throw new Error(`Failed to fetch address.`);
        }

        const data = await response.json();
        return data;
    }
    catch(error) {
        throw error;
    }
}
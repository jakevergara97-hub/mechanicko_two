export async function getCarBrands() {
    console.log('GET CAR BRANDS FRONTEND SERVICE REACHED')
    try {
        const response = await fetch(`http://localhost:3000/api/v1/mechanics/cars`);

        const data = await response.json();

        if(!response.ok) {
            throw new Error(data.error);
        }

        return data;

    }catch(error) {
        throw error;
    }
}
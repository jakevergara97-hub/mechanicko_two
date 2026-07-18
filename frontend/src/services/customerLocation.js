export function getCustomerLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    const response = await fetch(
                        `http://localhost:3000/api/reverse-geocode/${lat}/${lon}`
                    );

                    if (!response.ok) {
                        throw new Error("Failed to fetch address.");
                    }

                    const data = await response.json();

                    resolve(data);   // <-- return to caller
                } catch (err) {
                    reject(err);
                }
            },
            (err) => {
                reject(err);
            }
        );
    });
}
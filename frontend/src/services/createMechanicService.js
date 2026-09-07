export async function createMechanic(mechanic) {
    try {
        const response = await fetch("http://localhost:3000/api/v1/mechanics/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(mechanic),
        });

        const data = await response.json();

        if(!response.ok) {
            throw new Error (data.error);
        }
        console.log(data);

        const profile = await fetch("http://localhost:3000/api/v1/mechanics/me", {
                    credentials: "include"
                }
            );

        const dataProfile = await profile.json();
        console.log(dataProfile);
        return dataProfile;
    }
    catch(error) {
        console.error(error.message);
        throw error;
    }
}
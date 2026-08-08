export async function createMechanic(mechanic) {
    try {
        const responseWithToken = await fetch("http://localhost:3000/api/v1/mechanics/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mechanic),
        });

        const data = await responseWithToken.json();

        if(!responseWithToken.ok) {
            throw new Error (data.error);
        }
        console.log(data);

        localStorage.setItem(
            "token",
            data.token
        );

        const profile = await fetch("http://localhost:3000/api/v1/mechanics/me", {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

        const dataProfile = await profile.json();
        console.log(dataProfile);
        return dataProfile;
    }
    catch(error) {
        console.error(error.message);
        throw error;
    }
}
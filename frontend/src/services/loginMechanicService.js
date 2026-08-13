export async function loginMechanic(credentials) {
    console.log("LOGIN MECHANIC FRONTEND SERVICE HIT")
    console.log(credentials)
    try{
        const response = await fetch("http://localhost:3000/api/v1/mechanics/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if(!response.ok) {
            throw new Error(data.error);
        }

        localStorage.setItem("token", data.token);

        const profile = await fetch("http://localhost:3000/api/v1/mechanics/me", {
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        });

        const dataProfile = await profile.json();

        if(!profile.ok) {
            throw new Error(dataProfile.error);
        }

        console.log(dataProfile);

        return dataProfile;
    } catch(error) {
        throw error;
    }
}
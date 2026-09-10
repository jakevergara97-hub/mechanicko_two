export async function loginMechanic(credentials) {
    try{
        const response = await fetch("http://localhost:3000/api/v1/mechanics/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if(!response.ok) {
            throw new Error(data.error);
        }

        const profile = await fetch("http://localhost:3000/api/v1/mechanics/me", {
            credentials: "include",
        });

        const dataProfile = await profile.json();

        if(!profile.ok) {
            throw new Error(dataProfile.error);
        }

        return dataProfile;
    } catch(error) {
        throw error;
    }
}
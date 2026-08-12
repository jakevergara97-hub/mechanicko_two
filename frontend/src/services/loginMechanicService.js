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
            throw new Error(data.error)
        }

        return data;
    } catch(error) {
        throw error;
    }
}
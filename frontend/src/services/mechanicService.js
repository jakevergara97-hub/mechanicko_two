export async function createMechanic(mechanic) {
    try {
        const response = await fetch("http://localhost:3000/v1/mechanic/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mechanic),
        });

        if(!response.ok) {
            throw new Error (`Request failed: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        console.log(response.status);
        return data;
    }
    catch(error) {
        console.log(error.message)
    }
}
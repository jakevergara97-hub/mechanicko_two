export async function updateMechanicServices(id, updates) {
    console.log(updates);
    console.log(id);
    try{
        const response = await fetch(`http://localhost:3000/api/v1/mechanics/${id}/services`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updates)
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
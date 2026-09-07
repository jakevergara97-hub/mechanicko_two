export async function mechanicLogout() {
    const response = await fetch(`http://localhost:3000/api/v1/mechanics/logout`, {
        method: "POST",
        credentials: "include"
    });

    const data = await response.json();

    return data;
}
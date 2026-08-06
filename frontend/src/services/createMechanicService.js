// import { useContext } from "react";
// import { MechanicProfileContext } from "../context/MechanicProfileContext";

export async function createMechanic(mechanic) {
    // const { mechanicProfile, setMechanicProfile } = useContext(MechanicProfileContext);

    try {
        const response = await fetch("http://localhost:3000/api/v1/mechanics/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mechanic),
        });

        const data = await response.json();

        if(!response.ok) {
            throw new Error (data.error);
        }
        console.log(data);

        localStorage.setItem(
            "token",
            data.token
        );

        // setMechanicProfile(data);

        return data;
    }
    catch(error) {
        console.error(error.message);
        throw error;
    }
}
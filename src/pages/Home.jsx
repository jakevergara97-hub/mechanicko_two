import { useState, useEffect } from "react";
import { getUserLocation } from "../services/userLocation";

export function Home() {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        async function loadLocation() {
            const response = await getUserLocation();

            setLocation(response);
            console.log(response);
        }
        loadLocation();
    }, []);

    if (!location) {
        return <p>Loading...</p>;
    }

    const customerLocation = Object.hasOwn(location.address, 'city') ?
                    {
                        barangay: location.address.quarter,
                        city: location.address.city,
                        province: location.address.state
                    }
                    :
                    {
                        barangay: location.address.village,
                        town: location.address.town,
                        province: location.address.state
                    };

    return (
        <div>
            <h2>Location</h2>
            <ul>
                {Object.entries(customerLocation).map(([key, value], index) => (
                    <li key={index}>
                        {key[0].toUpperCase() + key.slice(1)}: {value}
                    </li>
                ))}
            </ul>

        </div>
    );
}


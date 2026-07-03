import { useState, useEffect } from "react";
import { getCustomerLocation } from "../../services/customerLocation";

export function CustomerLocation() {
    const [location, setLocation] = useState(null);
    const [isLocationCliked, setIsLocationClicked] = useState(false);

    useEffect(() => {
        async function loadLocation() {
            const response = await getCustomerLocation();
            console.log(response);
            setLocation(response);
        }
        loadLocation();
    }, []);

    if (!location) {
        return <p>Loading...</p>;
    }

    function showLocation() {
        setIsLocationClicked(true);
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
            <button onClick={showLocation}>
                Show Location
            </button>

            {isLocationCliked &&
                <ul>
                {Object.entries(customerLocation).map(([key, value], index) => (
                    <li key={index}>
                        {key[0].toUpperCase() + key.slice(1)}: {value}
                    </li>
                ))}
            </ul>
            }

        </div>
    );
}
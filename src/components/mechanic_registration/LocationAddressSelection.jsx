import { useState, useEffect } from "react";

export function LocationAddressSelection() {
    const [locationHierarchy, setLocationHierarchy] = useState(null);

    const regions = [];

    useEffect(() => {
        async function loadPSGC() {
            try{
                const response = await fetch("./psgc.json");

                if(!response.ok) {
                    throw new Error("Locations can't be loaded.");
                }
                const data = await response.json();
                console.log(data);
                setLocationHierarchy(data);
            }
            catch(error) {
                console.log(error.message);
            }

        }
        loadPSGC();
    }, []);

    for(const key in locationHierarchy) {
        regions.push(key);
    }

    console.log(regions);

    return (
        <>
            <p>Test</p>
        </>
    );
}
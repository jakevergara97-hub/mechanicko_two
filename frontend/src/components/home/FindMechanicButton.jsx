import { useState, useEffect, useRef, useContext } from "react";
import { CustomerLocationContext } from "../../context/CustomerLocationContext";
import { getMechanic } from "../../services/getMechanicService";
import { MechanicsInfoContext } from "../../context/MechanicsInfoContext";

export const FindMechanicButton =  () => {
    const { location, setLocation } = useContext(CustomerLocationContext);
    const { mechanics, setMechanics, error, setError } = useContext(MechanicsInfoContext);

    const {region, province, city, barangay} = location;

    const handleClick = async () => {
        if( !region ||
            !city ||
            !barangay
        ) {
            alert("Please complete the location")
            return;
        }


        try{
            const data = await getMechanic({
            // region,
            // province,
            city,
            barangay,
            });

            console.log(data);
            setMechanics(data);

        }catch (error) {
            setError(error.message);
        }
    }

    return (
        <div>
            <button onClick={handleClick}>
                Find Mechanic
            </button>
        </div>
    );
}
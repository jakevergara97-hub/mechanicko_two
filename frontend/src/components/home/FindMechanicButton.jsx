import { useState, useEffect, useRef, useContext } from "react";
import { CustomerLocationContext } from "../../context/CustomerLocationContext";
import { getMechanic } from "../../services/getMechanicService";
import { MechanicsInfoContext } from "../../context/MechanicsInfoContext";

export const FindMechanicButton =  () => {
    const { location, setLocation } = useContext(CustomerLocationContext);
    const { mechanics, setMechanics } = useContext(MechanicsInfoContext);

    const {region, province, city, barangay} = location;

    const handleClick = async () => {
        if(!location) {
            return;
        }

        const data = await getMechanic({
            // province,
            city,
            barangay,
        });

        console.log(data);
        setMechanics(data);
    }

    return (
        <div>
            <button onClick={handleClick}>
                Find Mechanic
            </button>
        </div>
    );
}
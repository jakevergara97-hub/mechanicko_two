import { useState, useEffect, useRef, useContext } from "react";
import { CustomerLocationContext } from "../../context/CustomerLocationContext";
import { getMechanic } from "../../services/getMechanicService";
import { MechanicsInfoContext } from "../../context/MechanicsInfoContext";

export const FindMechanicButton =  () => {
    const { location, setLocation } = useContext(CustomerLocationContext);
    const { mechanics, setMechanics, error, setError, isClicked, setIsClicked } = useContext(MechanicsInfoContext);

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
            const limit = 10;
            let page = 1;
            const data = await getMechanic({
            // region,
            // province,
            city,
            barangay,
            }, page, limit);

            setMechanics(data);
            setIsClicked(true);

        }catch (error) {
            setError(error.message);
        }
    }

    return (
        <div>
            <button onClick={handleClick}>
                Find Mechanic
            </button>
            <br />
            <br />
        </div>
    );
}
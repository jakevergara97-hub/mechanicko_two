import { useState, useEffect, useRef, useContext } from "react";
import { MechanicsInfoContext } from "../../context/MechanicsInfoContext";
import { CustomerLocationContext } from "../../context/CustomerLocationContext";
import { MechanicCardBarangay } from "./MechanicCardBarangay";
import { MechanicCardOtherBarangay } from "./MechanicCardOtherBarangay";

export const MechanicList = () => {
    const { mechanics, setMechanics } = useContext(MechanicsInfoContext);
    const { location, setLocation } = useContext(CustomerLocationContext);

    const mechanicsInTheBarangay = !mechanics.mechanics ? [] : mechanics.mechanics.filter(mechanic => mechanic.barangay === location.barangay);

    const mechanicsInOtherBarangay = !mechanics.mechanics ? [] : mechanics.mechanics.filter(mechanic => mechanic.barangay !== location.barangay);

    return (
        <div>
            <MechanicCardBarangay mechanics={mechanicsInTheBarangay} />
            <br />
            <MechanicCardOtherBarangay mechanics={mechanicsInOtherBarangay} />
        </div>
    );
}


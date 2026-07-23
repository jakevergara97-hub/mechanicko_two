import { useState, useEffect, useRef, useContext } from "react";
import { MechanicsInfoContext } from "../../context/MechanicsInfoContext";
import { CustomerLocationContext } from "../../context/CustomerLocationContext";
import { MechanicCardBarangay } from "./MechanicCardBarangay";
import { MechanicCardCity } from "./MechanicCardCity";

export const MechanicList = () => {
    const { mechanics, setMechanics } = useContext(MechanicsInfoContext);
    const { location, setLocation } = useContext(CustomerLocationContext);

    console.log(mechanics);
    return (
        <div>
            <p>TEST</p>
            <MechanicCardCity mechanics={mechanics} />

        </div>
    );
}


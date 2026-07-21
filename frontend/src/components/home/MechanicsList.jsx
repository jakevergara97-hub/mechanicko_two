import { useState, useEffect, useRef, useContext } from "react";
import { MechanicsInfoContext } from "../../context/MechanicsInfoContext";

export const MechanicList = () => {
    const { mechanics, setMechanics } = useContext(MechanicsInfoContext);

    // const {name} = mechanics;

    console.log(mechanics);

    return (
        <div>
            <p>TEST</p>
        </div>
    );
}


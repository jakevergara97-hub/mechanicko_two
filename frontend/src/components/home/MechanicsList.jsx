import { useState, useEffect, useRef, useContext } from "react";
import { MechanicsInfoContext } from "../../context/MechanicsInfoContext";
import { CustomerLocationContext } from "../../context/CustomerLocationContext";
import { MechanicCardBarangay } from "./MechanicCardBarangay";
import { MechanicCardOtherBarangay } from "./MechanicCardOtherBarangay";

export const MechanicList = () => {
    const { mechanics, setMechanics, error, setError } = useContext(MechanicsInfoContext);
    const { location, setLocation } = useContext(CustomerLocationContext);

    const city = location.city.includes("(Capital)")
        ? location.city.replace(" (Capital)", "")
        : location.city;

    const mechanicsInTheBarangay = !mechanics.mechanics ?
                                    []
                                    :
                                    mechanics.mechanics
                                    .filter(mechanic =>
                                        mechanic.barangay === location.barangay &&
                                        mechanic.city === city);

    const mechanicsInOtherBarangay = !mechanics.mechanics ?
                                    []
                                    :
                                    mechanics.mechanics
                                    .filter(mechanic =>
                                        mechanic.barangay !== location.barangay &&
                                        mechanic.city === city);

    return (
        <div>
            {error && <p>{error}</p>}

            {mechanicsInTheBarangay.length !== 0
                && <MechanicCardBarangay mechanics={mechanicsInTheBarangay} />
            }

            <br />

            {mechanicsInOtherBarangay.length !== 0
                && <MechanicCardOtherBarangay mechanics={mechanicsInOtherBarangay} />
            }
        </div>
    );
}


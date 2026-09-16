import { useState, useEffect, useRef, useContext } from "react";
import { MechanicsInfoContext } from "../../context/MechanicsInfoContext";
import { CustomerLocationContext } from "../../context/CustomerLocationContext";
import { MechanicCardBarangay } from "./MechanicCardBarangay";
import { MechanicCardOtherBarangay } from "./MechanicCardOtherBarangay";
import { MechanicsPaginationSameBarangay } from "../common/MechanicsPaginationSameBarangay";

export const MechanicList = () => {
    const { mechanics, setMechanics, error, setError, isClicked } = useContext(MechanicsInfoContext);
    const { location, setLocation } = useContext(CustomerLocationContext);

    // const city = location.city.includes("(Capital)")
    //     ? location.city.replace(" (Capital)", "")
    //     : location.city;

    const mechanicsInTheBarangay = !mechanics.mechanics ?
                                    []
                                    :
                                    mechanics.mechanics
                                    .filter(mechanic =>
                                        mechanic.barangay === location.barangay &&
                                        location.city
                                        // mechanic.city === city
                                        );

    const mechanicsInOtherBarangay = !mechanics.mechanics ?
                                    []
                                    :
                                    mechanics.mechanics
                                    .filter(mechanic =>
                                        mechanic.barangay !== location.barangay &&
                                        location.city
                                        // mechanic.city === city
                                        );

    console.log(mechanicsInTheBarangay.map((mechanic) => mechanic.barangay));
    // console.log(mechanicsInTheBarangay[0].barangay)

    return (
        <div>
            {error && <p>{error}</p>}

            {isClicked && mechanicsInTheBarangay.length === 0 &&
                <h2>No available mechanics in your barangay</h2>
            }

            {isClicked && mechanicsInTheBarangay.length !== 0 &&
                <div>
                    <h2>Available mechanics in your barangay</h2>
                    <MechanicCardBarangay mechanics={mechanicsInTheBarangay} />
                    {/* <MechanicsPaginationSameBarangay
                        mechanicBarangay={mechanicsInTheBarangay[0].barangay}
                    /> */}
                </div>
            }

            <br /><br />

            {isClicked && mechanicsInOtherBarangay.length === 0 &&
                <h2>No available mechanics in other barangays</h2>
            }

            {isClicked && mechanicsInOtherBarangay.length !== 0 &&
                <div>
                    <h2>Available mechanics in other barangays</h2>
                    <MechanicCardOtherBarangay mechanics={mechanicsInOtherBarangay} />
                </div>
            }

        </div>
    );
}


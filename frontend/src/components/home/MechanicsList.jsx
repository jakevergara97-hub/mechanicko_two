import { useState, useEffect, useRef, useContext } from "react";
import { MechanicsInfoContext } from "../../context/MechanicsInfoContext";
import { CustomerLocationContext } from "../../context/CustomerLocationContext";
import { AllMechanicsCard } from "./AllMechanicsCard";

export const MechanicList = () => {
    const { mechanics, error, isClicked } = useContext(MechanicsInfoContext);
    const { location } = useContext(CustomerLocationContext);

    return (
        <div>
            {error && <h2>{error}</h2>}

            {isClicked && mechanics.mechanics.length !== 0 &&
                <div>
                    <AllMechanicsCard
                        mechanics={mechanics}
                        location={location}
                        isClicked={isClicked}
                    />
                </div>
            }
        </div>
    );
}


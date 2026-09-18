import { MechanicsPagesNavigator } from "../common/MechanicsPagesNavigator";
import { toTitleCase } from "../../utils/toTitleCase";
import { useEffect, useState } from "react";

export function AllMechanicsCard({mechanics, location, isClicked}) {
    const [barangayMechanics, setBarangayMechanics] = useState([]);
    const [otherBarangayMechanics, setOtherBarangayMechanics] = useState([]);
    let pages = [];

    useEffect(() => {
        const loadBarangayMechanics = () => {
            if(!mechanics.mechanics) {
                return <p>Loading...</p>
            }
            setBarangayMechanics(
                mechanics.mechanics
                    .filter(mechanic =>
                    mechanic.barangay === location.barangay &&
                    location.city
                )
            )
        }

        const loadOtherBarangayMechanics = () => {
            setOtherBarangayMechanics(
                mechanics.mechanics
                    .filter(mechanic =>
                    mechanic.barangay !== location.barangay &&
                    location.city
                )
            )
        }

        loadBarangayMechanics();
        loadOtherBarangayMechanics();
    },[]);

    const mechanicsInTheBarangay = !mechanics.mechanics
        ?
            []
        :
            mechanics.mechanics
            .filter(mechanic =>
            mechanic.barangay === location.barangay &&
            location.city
        );

    const mechanicsInOtherBarangay = !mechanics.mechanics ?
            []
        :
            mechanics.mechanics
            .filter(mechanic =>
            mechanic.barangay !== location.barangay &&
            location.city
        );

    for(let i = 1; i <= mechanics.totalPages; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div>
                {isClicked &&
                    mechanics.currentPage === 1 &&
                    barangayMechanics.length === 0 &&
                        <h2>No available mechanics in your barangay</h2>
                }

                {isClicked && mechanicsInTheBarangay.length !== 0 &&
                    <div>
                        <h2>Available mechanics in your barangay</h2>
                        {mechanicsInTheBarangay.map((mechanic) => {
                            const firstName = toTitleCase(mechanic.first_name);
                            const lastName = toTitleCase(mechanic.last_name);
                            const fullName = firstName + " " + lastName;

                            return (
                                <div key={mechanic.id}>
                                    <h3>{fullName}</h3>
                                    <p>Phone number: {mechanic.phone_number}</p>
                                    <p>Email: {mechanic.email}</p>
                                    <p>City: {mechanic.city}</p>
                                    <p>Barangay: {mechanic.barangay}</p>
                                </div>
                                )
                        })}
                    </div>
                }
            </div>

            <div>
                {isClicked &&
                    mechanics.currentPage === 1 &&
                    otherBarangayMechanics.length === 0 &&
                        <h2>No available mechanics in other barangays</h2>
                }

                {isClicked && mechanicsInOtherBarangay.length !== 0 &&
                    <div>
                        <h2>Available mechanics in other barangays</h2>
                        {mechanicsInOtherBarangay.map((mechanic) => {
                            const firstName = toTitleCase(mechanic.first_name);
                            const lastName = toTitleCase(mechanic.last_name);
                            const fullName = firstName + " " + lastName;

                            return (
                                <div key={mechanic.id}>
                                    <h3>{fullName}</h3>
                                    <p>Phone number: {mechanic.phone_number}</p>
                                    <p>Email: {mechanic.email}</p>
                                    <p>City: {mechanic.city}</p>
                                    <p>Barangay: {mechanic.barangay}</p>
                                </div>
                                )
                        })}
                    </div>
                }
            </div>
            <br />
            <MechanicsPagesNavigator pages={pages} />
        </div>
    );
}
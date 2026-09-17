import { MechanicsPagesNavigator } from "../common/MechanicsPagesNavigator";

export function AllMechanicsCard({mechanics, location, isClicked}) {
    console.log(location.barangay);
    let pages = [];

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
                {isClicked && mechanicsInTheBarangay.length === 0 &&
                    <h2>No available mechanics in your barangay</h2>
                }

                {isClicked && mechanicsInTheBarangay.length !== 0 &&
                    <div>
                        <h2>Available mechanics in your barangay</h2>
                        {mechanicsInTheBarangay.map((mechanic) => {
                            const firstName = mechanic.first_name[0].toUpperCase() + mechanic.first_name.slice(1);
                            const lastName = mechanic.last_name[0].toUpperCase() + mechanic.last_name.slice(1);
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
                {isClicked && mechanicsInOtherBarangay.length === 0 &&
                    <h2>No available mechanics in other barangays</h2>
                }

                {isClicked && mechanicsInOtherBarangay.length !== 0 &&
                    <div>
                        <h2>Available mechanics in other barangays</h2>
                        {mechanicsInOtherBarangay.map((mechanic) => {
                            const firstName = mechanic.first_name[0].toUpperCase() + mechanic.first_name.slice(1);
                            const lastName = mechanic.last_name[0].toUpperCase() + mechanic.last_name.slice(1);
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
            <MechanicsPagesNavigator pages={pages} />
        </div>
    );
}
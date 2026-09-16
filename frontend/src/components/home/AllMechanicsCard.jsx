import { MechanicsPagesNavigator } from "../common/MechanicsPagesNavigator";

export function AllMechanicsCard({mechanics, location}) {
    console.log(location.barangay);
    // const pageNumbers = mechanics.totalPages;
    let pages = [];

    const mechanicsInTheBarangay = !mechanics.mechanics ?
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

    // mechanics.totalPages
    for(let i = 1; i <= mechanics.totalPages; i++) {
        pages.push(i)
    }

    console.log(pages)

    return (
        <div>
            <div>
                {mechanicsInTheBarangay.length !== 0 ?

                    mechanicsInTheBarangay.map((mechanic) => {
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
                        })
                    :
                    <p>No available mechanics in your barangay</p>
                }
            </div>



            {/* <div>

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
                    })
                }
            </div> */}

            <div>
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
                    })
                }
            </div>
            <MechanicsPagesNavigator pages={pages} />
        </div>
    );
}
export function MechanicCardOtherBarangay({mechanics}) {
    return (
        <div>
            <div>
                {mechanics.map((mechanic) => {
                    const firstName = mechanic.first_name[0].toUpperCase() + mechanic.first_name.slice(1);
                    const lastName = mechanic.last_name[0].toUpperCase() + mechanic.last_name.slice(1);
                    const fullName = firstName + " " + lastName;

                return (
                    <div key={mechanic.mechanic_id}>
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
        </div>
    );
}
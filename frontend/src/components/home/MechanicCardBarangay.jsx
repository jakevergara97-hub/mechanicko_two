export function MechanicCardBarangay({mechanics}) {

    return (
        <div>
            {mechanics.map((mechanic) => {
                const firstName = mechanic.firstName[0].toUpperCase() + mechanic.firstName.slice(1);
                const lastName = mechanic.lastName[0].toUpperCase() + mechanic.lastName.slice(1);
                const fullName = firstName + " " + lastName;

                return (
                    <div key={mechanic.mechanicID}>
                        <h3>{fullName}</h3>
                        <p>Phone number: {mechanic.phoneNumber}</p>
                        <p>Email: {mechanic.email}</p>
                        <p>City: {mechanic.city}</p>
                        <p>Barangay: {mechanic.barangay}</p>
                    </div>
                )
            })}
        </div>
    );
}
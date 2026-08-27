export function MechanicServices({mechanic}){

    return (
        <>
            {mechanic.mechanicInfo.services &&
                <>
                    <h3>Services</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {mechanic.mechanicInfo.services.map((service, index) =>
                            <li key={index}>{service}</li>
                        )}
                    </ul>
                </>
            }
        </>
    )
}
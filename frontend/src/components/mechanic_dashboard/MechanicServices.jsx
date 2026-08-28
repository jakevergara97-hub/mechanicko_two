import { useEffect, useState } from "react"

export function MechanicServices({mechanic}){
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        services: []
    });

    useEffect(() => {
        if(mechanic?.mechanicInfo) {
            setFormData({
                services: mechanic.mechanicInfo.services
            });
        }
    },[]);

    const handleRemoveService = (index) => {
        setFormData((prevData) => {
            return {
                ...prevData,
                services: prevData.services.filter((_, i) => i !== index)
            }
        });
    }

    const handleCancel = () => {
        setFormData({
            services: mechanic.mechanicInfo.services
        });
        setIsEditing(false);
    }

    return (
        <>
            {isEditing ?
                <>
                    <h3>Editing Services</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {formData.services.map((service, index) =>
                            <li key={index}>{service}
                            <button type="button" onClick={() => handleRemoveService(index)}>x</button>
                            </li>
                        )}
                    </ul>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </>
                :
                <>
                    <h3>Services</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {mechanic.mechanicInfo.services.map((service, index) =>
                            <li key={index}>{service}</li>
                        )}
                    </ul>
                    <button type="button" onClick={() => setIsEditing(!isEditing)}>Edit</button>
                </>
            }

        </>
    )
}
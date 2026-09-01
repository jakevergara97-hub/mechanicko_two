import { useEffect, useState } from "react";
import { updateMechanicServices } from "../../services/updateMechanicServicesService";

export function MechanicServices({mechanic}){
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        services: []
    });
    const [serviceInput, setServiceInput] = useState('');

    useEffect(() => {
        if(mechanic?.mechanicInfo) {
            setFormData({
                services: mechanic.mechanicInfo.services
            });
        }
    },[mechanic]);

    const handleChange = (e) => {
        const { value } = e.target;

        setServiceInput(value);
    }

    const handleAddService = () => {
        if(!serviceInput.trim()) return;

        setFormData((prevData) => ({
            ...prevData,
            services: [...prevData.services, serviceInput.trim()]
        }));

        setServiceInput('');
    }

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

    const handleSaveServices = async () => {
        const { services } = formData;
        const id = mechanic.mechanicInfo.id;
        try{
            const data = await updateMechanicServices(id, services);

            if(!data) {
                setIsEditing(false);
                return;
            }

            if(data.success) {
                console.log('success');
                console.log(data);
                mechanic.mechanicInfo.services = data.updatedServices;
                setIsEditing(false);
            }

        } catch(error) {
            alert(error);
        }
    }

    return (
        <>
            {isEditing ?
                <>
                    <h3>Editing Services</h3>
                    <input
                        id="mechanic-service"
                        type="text"
                        name="service"
                        value={serviceInput}
                        onChange={handleChange}

                        placeholder="e.g., Oil Change"
                    >
                    </input>

                    <button type="button" onClick={handleAddService}>Add Service</button>

                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {formData.services.map((service, index) =>
                            <li key={index}>{service}
                            <button type="button" onClick={() => handleRemoveService(index)}>x</button>
                            </li>
                        )}
                    </ul>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                    <button type="button" onClick={handleSaveServices}>Save</button>
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
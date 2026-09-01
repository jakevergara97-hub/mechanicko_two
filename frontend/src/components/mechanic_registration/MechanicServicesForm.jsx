import { useState } from "react";

export function MechanicServicesForm({formData, setFormData}) {
    const [serviceInput, setServiceInput] = useState('');

    const handleChange = (e) => {
        const { value } = e.target;

        setServiceInput(value)
    }

    const handleAddService = () => {
        if(!serviceInput.trim()) return;

        setFormData((prevData) => {
            return {
                ...prevData,
                services: [...prevData.services, serviceInput.trim()]
            }
        })

        setServiceInput('');
    }

    const handleRemoveInput = (index) => {
        setFormData((prevData) => {
            return {
                ...prevData,
                services: prevData.services.filter((_, i) => i !== index)
            }
        });
    }

    return (
        <>
            <p>*Sample services</p>
            <p>Oil Change, Brake Repair, Engine Repair, Tire Change / Tire Repair</p>
            <p>Battery Replacement, Air Conditioning Repair, Preventive Maintenance, General Auto Repair</p>
            <input
                id="mechanic-service"
                type="text"
                name="service"
                value={serviceInput}
                onChange={handleChange}

                placeholder="e.g., Oil Change"
            >
            </input>

            <button type="button" onClick={handleAddService}>Add</button>

            {!formData.services ?
                <p>Add services</p>
                :
                <ul>
                    {formData.services.map((service, index) => (
                        <li key={index}>
                            {service}
                            <button type="button" onClick={() => handleRemoveInput(index)}>x</button>
                        </li>
                    ))}
                </ul>
            }
        </>
    )
}
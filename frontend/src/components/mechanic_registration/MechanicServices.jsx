import { useState } from "react";

export function MechanicServices({formData, setFormData}) {
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
                services: [...prevData.services, serviceInput]
            }
        })

        setServiceInput('');
    }

    const handleRemoveInput = (index) => {
        formData.services.splice(index, 1);
        setFormData((prevData) => {
            return {
                ...prevData,
                services: [...prevData.services]
            }
        });
    }

    return (
        <>
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
                            <button onClick={() => handleRemoveInput(index)}>x</button>
                        </li>
                    ))}
                </ul>
            }
        </>
    )
}
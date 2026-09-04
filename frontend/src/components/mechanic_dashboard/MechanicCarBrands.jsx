import { useEffect, useState } from "react";
import { toTitleCase } from "../../utils/toTitleCase";

export function MechanicCarBrands({mechanic}) {
    const [isEditing, setIsEditing] = useState(false);
    const [carInput, setCarInput] = useState('');
    const [formData, setFormData] = useState({
        carBrands: []
    });

    useEffect(() => {
        if(mechanic?.mechanicInfo){
            setFormData({
                carBrands: mechanic.mechanicInfo.carBrands
            });
        }
    },[]);

    const handleChange = (e) => {
        const { value } = e.target;

        setCarInput(value);
    }

    const handleAddCarBrand = () => {
        if(!carInput.trim()) return;

        setFormData((prevData) => ({
            ...prevData,
            carBrands: [...prevData.carBrands, toTitleCase(carInput)]
        }));

        setCarInput('');
    }

    const handleRemoveCar = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            carBrands: prevData.carBrands.filter((_,i) => i !== index)
        }));
    }

    const handleCancel = () => {
        setFormData({
            carBrands: mechanic.mechanicInfo.carBrands
        });
        setIsEditing(false);
    }

    console.log(formData.carBrands)

    return (
        <>
            {isEditing ?
                <>
                    <h3>Editing Experienced Car Brands</h3>
                    <input
                        id="mechanic-car"
                        type="text"
                        name="car"
                        value={carInput}
                        onChange={handleChange}

                        placeholder="e.g., Volkswagen"
                    >
                    </input>

                    <button type="button" onClick={handleAddCarBrand}>Add Car Brand</button>

                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {formData.carBrands.map((brand, index) => (
                            <li key={index}>
                                {brand}
                                <button type="button" onClick={() => handleRemoveCar(index)}>x</button>
                            </li>
                        ))}
                    </ul>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                    <button type="button">Save</button>
                </>
                :
                <>
                    <h3>Experienced Car Brands</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {mechanic.mechanicInfo.carBrands.map((brand, index) => (
                            <li key={index}>
                                {brand}
                            </li>
                        ))}
                    </ul>
                    <button type="button" onClick={() => setIsEditing(!isEditing)}>Edit</button>
                </>
            }

        </>
    )
}
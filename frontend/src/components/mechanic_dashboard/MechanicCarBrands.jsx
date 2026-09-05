import { useEffect, useState } from "react";
import { toTitleCase } from "../../utils/toTitleCase";
import { updateMechanicCarBrands } from "../../services/updateMechanicCarBrands";

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
    },[mechanic]);

    const handleChange = (e) => {
        const { value } = e.target;

        setCarInput(value);
    }

    const handleAddCarBrand = () => {
        if(!carInput.trim()) return;

        if(formData.carBrands.includes(toTitleCase(carInput.trim()))) {
            alert('Duplicate brand');
            return;
        }

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

    const handleSaveCarBrands = async () => {
        const { carBrands } = formData;
        const id = mechanic.mechanicInfo.id;
        try{
            const data = await updateMechanicCarBrands(id, carBrands);

            if(!data) {
                setIsEditing(false);
                return;
            }

            if(data.success){
                console.log('success');
                console.log(data);
                mechanic.mechanicInfo.carBrands = data.updatedCarBrands;
                setIsEditing(false);
            }
        }catch(error){
            alert(error);
        }
    }

    const handleCancel = () => {
        setFormData({
            carBrands: mechanic.mechanicInfo.carBrands
        });
        setCarInput('');
        setIsEditing(false);
    }

    // console.log(formData.carBrands);

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
                    <button type="button" onClick={handleSaveCarBrands}>Save</button>
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
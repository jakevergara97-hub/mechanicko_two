import { useState, useEffect } from "react";
import { getCarBrands } from "../../services/getCarBrandsService";

export function MechanicCarBrandForm({formData, setFormData}) {
    const [carBrands, setCarBrands] = useState([]);
    const [carInput, setCarInput] = useState('');
    const [formDataOther, setFormDataOther] = useState({
        carBrands: []
    });

    useEffect(() => {
        const loadCarBrands = async () => {
            try {
                const data = await getCarBrands();

                if(!data) {
                    throw new Error('No available car brands at the moment')
                }

                setCarBrands(data);
            } catch(error) {
                alert(error);
            }
        }
        loadCarBrands();
    },[]);

    if(carBrands.length === 0) {
        return <p>Loading car brands</p>
    }

    const handleChange = (e) => {
        const { value, checked} = e.target;

        if(checked) {
            setFormData((prevData) => {
                return {
                    ...prevData,
                    carBrands: [...prevData.carBrands, value]
                }
            });
        } else {
            setFormData((prevData) => {
                return{
                    ...prevData,
                    carBrands: prevData.carBrands.filter((brand) => brand !== value)
                }
            })
        }
    }

    const handleAddOtherCars = () => {
        if(!carInput) return;

        if(!carBrands.brands.includes(carInput)) {
            console.log(carInput)
            setFormData((prevData) => ({
                ...prevData,
                otherCarBrands: [...prevData.otherCarBrands, carInput]
            }));
        } else {
            setCarInput('');
            return;
        }

        setCarInput('');
    }

    const handleRemoveOtherCar = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            otherCarBrands: prevData.otherCarBrands.filter((_, i) => i !== index)
        }));
    }

    // console.log(formData.carBrands);
    // console.log(formData.otherCarBrands);

    return (
        <>
            {carBrands.brands.map((brand, index) => (
                    <div key={index}>
                        <label>
                            <input
                                type="checkbox"
                                value={brand}
                                checked={formData.carBrands.includes(brand)}
                                onChange={handleChange}
                            />
                            {brand}
                        </label>
                    </div>
                ))
            }
            <label>Other cars:
                <input
                    id="other-cars"
                    type="text"
                    value={carInput}
                    onChange={(e) => setCarInput(e.target.value)}

                    placeholder="e.g., Volkswagen"
                />

                <button type="button" onClick={handleAddOtherCars}>Add</button>
            </label>

            {formData.otherCarBrands.length !== 0 &&
                <ul>
                    {formData.otherCarBrands.map((brand, index) => (
                        <li key={index}>
                            {brand}
                            <button type="button" onClick={() => handleRemoveOtherCar(index)}>x</button>
                        </li>
                    ))}
                </ul>
            }
        </>
    )
}
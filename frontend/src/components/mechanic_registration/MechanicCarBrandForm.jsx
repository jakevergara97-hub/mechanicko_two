import { useState, useEffect } from "react";
import { getCarBrands } from "../../services/getCarBrandsService";

export function MechanicCarBrandForm({formData, setFormData}) {
    const [carBrands, setCarBrands] = useState([]);

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

    console.log(formData.carBrands);

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
        </>
    )
}
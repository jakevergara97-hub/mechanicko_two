import { useState, useEffect } from "react";
import { updateMechanicAddress } from "../../services/updateMechanicAddressService";

export function MechanicAddress({mechanic}) {
    const [locationHierarchy, setLocationHierarchy] = useState({});
    const [formData, setFormData] = useState({
        region: '',
        province: '',
        city: '',
        barangay: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        async function loadPSGC() {
            try{
                const response = await fetch("./psgc.json");

                if(!response.ok) {
                    throw new Error("Locations can't be loaded.");
                }
                const data = await response.json();

                setLocationHierarchy(data);
            }
            catch(error) {
                alert(error.message);
            }

        }
        loadPSGC();
    }, []);

    useEffect(() => {
        if(mechanic?.mechanicInfo) {
            setFormData({
                region: mechanic.mechanicInfo.region,
                province: mechanic.mechanicInfo?.province,
                city: mechanic.mechanicInfo.city,
                barangay: mechanic.mechanicInfo.barangay
            })
        }
    },[mechanic]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        });

        if(name === 'region') {
            setFormData((prevData) => {
                return {
                    ...prevData,
                    province: '',
                    city: '',
                    barangay: '',
                }
            });
        }

        if(name === 'province') {
            console.log('region');
            console.log(value);
            setFormData((prevData) => {
                return {
                    ...prevData,
                    city: '',
                    barangay: '',
                }
            });
        }

        if(name === 'city') {
            setFormData((prevData) => {
                return {
                    ...prevData,
                    barangay: '',
                }
            });
        }
    }

    const handleAddressSave = async () => {
        let { region, province, city, barangay } = formData;
        const id = mechanic.mechanicInfo.id;

        try{
            const data = await updateMechanicAddress(id, {region, province, city, barangay});
            console.log(data);

            if(data.success) {
                console.log('success');
                mechanic.mechanicInfo.region = data.mechanic.region;
                mechanic.mechanicInfo.province = data.mechanic?.province;
                mechanic.mechanicInfo.city = data.mechanic.city;
                mechanic.mechanicInfo.barangay = data.mechanic.barangay;

                setFormData({
                    region: data.mechanic.region,
                    province: data.mechanic?.province,
                    city: data.mechanic.city,
                    barangay: data.mechanic.barangay
                });

                setIsEditing(false);
            }

        } catch(error) {
            alert(error);
        }
    }

    const handleCancel = () => {
        formData.region = mechanic.mechanicInfo.region;
        formData.province = mechanic.mechanicInfo?.province;
        formData.city = mechanic.mechanicInfo.city;
        formData.barangay = mechanic.mechanicInfo.barangay;
        setIsEditing(false);
    }

    return (
        <>
            <div>
                {isEditing ?
                    <>
                        <select
                            id="region-select"
                            name="region"
                            value={formData.region}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Select region</option>

                            {Object.keys(locationHierarchy).map((region) =>
                                <option key={region} value={region}>{region}</option>
                            )}

                        </select>

                        {formData.region === 'NATIONAL CAPITAL REGION (NCR)' ?
                            (
                                <>
                                    <select
                                        id="city-select"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                    >
                                        {!formData.region ?
                                            <option value="" disabled>Select city</option>
                                            :
                                            <>
                                                {Object.keys(locationHierarchy[formData.region])
                                                    .filter((city) => city !== 'population'
                                                                    && city !== 'notes')
                                                    .map((city) =>
                                                        <option key={city} value={city}>
                                                            {city}
                                                        </option>
                                                    )
                                                }
                                            </>
                                        }

                                    </select>

                                    <select
                                        id="barangay-select"
                                        name="barangay"
                                        value={formData.barangay}
                                        onChange={handleChange}
                                    >
                                        {!formData.city ?
                                            <option value="" disabled>Select barangay</option>
                                            :
                                            <>
                                                {Object.keys(locationHierarchy
                                                    [formData.region]
                                                    [formData.city])
                                                        .filter((barangay) => barangay !== 'population'
                                                                && barangay !== 'class'
                                                                && barangay !== 'cityClass'
                                                                )
                                                        .map((barangay) =>
                                                            <option key={barangay} value={barangay}>
                                                                {barangay}
                                                            </option>
                                                        )
                                                }
                                            </>
                                        }
                                    </select>
                                </>
                            )
                            :
                            (
                                <>
                                    <select
                                        id="province-select"
                                        name="province"
                                        value={formData.province}
                                        onChange={handleChange}
                                    >

                                        <option value="" disabled>Select province</option>

                                        {Object.keys(locationHierarchy[formData.region])
                                            .filter((province) => province !== 'population')
                                            .map((province) =>
                                            <option key={province} value={province}>
                                                {province}
                                            </option>
                                            )
                                        }
                                    </select>

                                    <select
                                        id="city-select"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                    >
                                        {!formData.province ?
                                            <option value="" disabled>Select city</option>
                                            :
                                            <>
                                                {Object.keys(locationHierarchy[formData.region][formData.province])
                                                    .filter((city) => city !== 'population' && city !== 'notes')
                                                    .map((city) =>
                                                        <option key={city} value={city}>
                                                            {city}
                                                        </option>
                                                    )
                                                }
                                            </>
                                        }

                                    </select>

                                    <select
                                        id="barangay-select"
                                        name="barangay"
                                        value={formData.barangay}
                                        onChange={handleChange}
                                    >
                                        {!formData.city ?
                                            <option value="" disabled>Select barangay</option>
                                            :
                                            <>
                                                {Object.keys(locationHierarchy
                                                            [formData.region]
                                                            [formData.province]
                                                            [formData.city])
                                                        .filter((barangay) => barangay !== 'population'
                                                                && barangay !== 'class'
                                                                && barangay !== 'cityClass')
                                                        .map((barangay) =>
                                                            <option key={barangay} value={barangay}>
                                                                {barangay}
                                                            </option>
                                                        )
                                                }
                                            </>
                                        }
                                    </select>
                                </>
                            )
                        }

                        <button onClick={handleAddressSave}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>


                    </>
                    :
                    <>
                        <h3>Address</h3>
                        {mechanic.mechanicInfo.province &&  <p>Province: {mechanic.mechanicInfo.province}</p>}
                        <p>City: {mechanic.mechanicInfo.city}</p>
                        <p>Barangay: {mechanic.mechanicInfo.barangay}</p>
                        <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
                    </>
                }
            </div>
        </>
    )
}
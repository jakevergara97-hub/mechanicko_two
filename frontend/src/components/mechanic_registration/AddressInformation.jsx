import { useState, useEffect } from "react";

export function AddressInformation({ formData, setFormData }) {
    const [locationHierarchy, setLocationHierarchy] = useState({});
    const [touched, setTouched] = useState({});

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

    const regions = Object.keys(locationHierarchy);

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

    return (
        <div>
            <select
                id="region-select"
                name="region"
                value={formData.region}
                onChange={handleChange}
                onBlur={(e) => setTouched({
                        ...touched,
                        region: true,
                    })}
            >
                {regions.length === 0
                    && <option value="" disabled>Regions loading...</option>
                }

                {}

                <option value="" disabled>Select region</option>

                {regions.map((region) =>
                    <option key={region} value={region}>{region}</option>
                )}
            </select>

            {touched.region && !formData.region
                    && (<p style={{color:'red'}}>Region is required</p>)
            }

            <br />

            {formData.region === 'NATIONAL CAPITAL REGION (NCR)' ?
                (
                    <div>
                        <select
                            id="city-select"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            onBlur={(e) => setTouched(prev => ({
                                    ...prev,
                                    [e.target.name]: true,
                                }))
                            }
                        >

                        {!formData.region ?
                            <option value="" disabled>Select city</option>
                            :
                            <>
                                <option value="" disabled>Select city</option>
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

                        {touched.city && !formData.city &&
                            (<p style={{color:'red'}}>City/Town is required</p>)
                        }

                        <br />
                        <select
                            id="barangay-select"
                            name="barangay"
                            value={formData.barangay}
                            onChange={handleChange}
                            onBlur={(e) => setTouched(prev => ({
                                    ...prev,
                                    [e.target.name]: true,
                                }))
                            }
                        >
                            {!formData.city ?
                                <option value="" disabled>Select barangay</option>
                                :
                                <>
                                    <option value="" disabled>Select barangay</option>
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

                        {touched.barangay && !formData.barangay &&
                            (<p style={{color:'red'}}>Barangay is required</p>)
                        }

                    </div>
                )
                :
                (
                    <div>
                        <select
                            id="province-select"
                            name="province"
                            value={formData.province}
                            onChange={handleChange}
                            onBlur={(e) => setTouched(prev => ({
                                    ...prev,
                                    [e.target.name]: true,
                                }))
                            }
                        >
                            {!formData.region ?
                                <option value="" disabled>Select province</option>
                                :
                                <>
                                    <option value="" disabled>Select province</option>
                                    {Object.keys(locationHierarchy[formData.region])
                                        .filter((province) => province !== 'population')
                                        .map((province) =>
                                        <option key={province} value={province}>
                                            {province}
                                        </option>
                                        )
                                    }
                                </>

                            }
                        </select>

                        {touched.province && !formData.province &&
                            (<p style={{color:'red'}}>Province is required</p>)
                        }

                        <br />
                        <select
                            id="city-select"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            onBlur={(e) => setTouched(prev => ({
                                    ...prev,
                                    [e.target.name]: true,
                                }))
                            }
                        >
                            {!formData.province ?
                                <option value="" disabled>Select city/town</option>
                                :
                                <>
                                    <option value="" disabled>Select city/town</option>
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

                        {touched.city && !formData.city &&
                            (<p style={{color:'red'}}>City/Town is required</p>)
                        }

                        <br />
                        <select
                            id="barangay-select"
                            name="barangay"
                            value={formData.barangay}
                            onChange={handleChange}
                            onBlur={(e) => setTouched(prev => ({
                                    ...prev,
                                    [e.target.name]: true,
                                }))
                            }
                        >

                            {!formData.city ?
                                <option value="" disabled>Select barangay</option>
                                :
                                <>
                                    <option value="" disabled>Select barangay</option>
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

                        {touched.barangay && !formData.barangay &&
                            (<p style={{color:'red'}}>Barangay is required</p>)
                        }
                    </div>
                )
            }
        </div>
    );

}
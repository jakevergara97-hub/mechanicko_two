import { useState, useEffect, useRef } from "react";
import { createMechanic } from "../../services/mechanicService";

export function MechanicRegistrationForm() {
    const [locationHierarchy, setLocationHierarchy] = useState({});

    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const [touched, setTouched] = useState({});

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [barangays, setBarangays] = useState([]);

    const [emailError, setEmailError] = useState('');

    const initialFormState = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',

        region: '',
        province: '',
        city: '',
        barangay: '',
    }

    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (event) => {
        const {name, value} = event.target;

        if(name === 'email') {
            validateEmail(value);

            if(!emailError) {
                setFormData((prevData) => {
                    return {
                        ...prevData,
                        [name]: value,
                    }
                });
            }
        }

        setFormData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            }
        });
    }

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!value) {
            setEmailError('Email is empty');
        } else if(!emailRegex.test(value)) {
            setEmailError('Email address is not valid');
        } else {
            setEmailError('');
        }
    }

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

    function handleRegionSelection(e) {
        const region = e.target.value;
        setSelectedRegion(region);

        setFormData((prevData) => {
            return {
                ...prevData,
                region,
                province: '',
                city: '',
                barangay: '',
            }
        });

        if(region === 'NATIONAL CAPITAL REGION (NCR)') {
            setCities(
                Object.keys(locationHierarchy[region])
                    .filter(province => province !== "population")
            );
        } else {
            setProvinces(
                Object.keys(locationHierarchy[region])
                    .filter(province => province !== "population")
                );
        }
    }

    function handleProvinceSelection(e) {
        const province = e.target.value;
        setSelectedProvince(province);

        setFormData((prevData) => {
            return {
                ...prevData,
                province,
                city: '',
                barangay: '',
            }
        });

        setCities(
            Object.keys(locationHierarchy[selectedRegion][province])
                .filter(city =>
                        city !== 'population'
                        && city !== 'notes'
                        && city !== 'class'
                        && city !== 'cityClass')
        );
    }

    function handleCitySelection(e) {
        const city = e.target.value;

        setSelectedCity(city);
        setFormData((prevData) => {
            return {
                ...prevData,
                city,
                barangay: '',
            }
        });

        if(selectedRegion === 'NATIONAL CAPITAL REGION (NCR)') {
            setBarangays(
                Object.keys(locationHierarchy[selectedRegion][city])
                    .filter(barangay =>
                            barangay !== "cityClass"
                            && barangay !== "class"
                            && barangay !== "population")
            );
        } else {
            setBarangays(
            Object.keys(locationHierarchy[selectedRegion][selectedProvince][city])
                .filter(barangay =>
                        barangay !== "cityClass"
                        && barangay !== "class"
                        && barangay !== "population")
            );
        }
    }

    function handleBarangaySelection(e) {
        const barangay = e.target.value;

        setFormData((prevData) => ({
                ...prevData,
                barangay,
            })
        );
    }

    const regions = Object.keys(locationHierarchy);

    async function handleSubmit(e) {
        e.preventDefault();

        let { firstName,
                lastName,
                phoneNumber,
                email,
                province,
                city,
                barangay,
            } = formData;

        for(const [key, value] of Object.entries(formData)) {
            if(key === 'province') {
                continue;
            }

            if(value === '') {
                return;
            }
        }

        let slicedCity = city.includes('(Capital)') ? city.replace(' (Capital)', '') : city;

        try {
            const response = await createMechanic({
                firstName,
                lastName,
                phoneNumber,
                email,
                province,
                city: slicedCity,
                barangay,
            });

            console.log(response);
            if(response.success) {
                console.log("success");
                // Do the getting of the id here and the routing to the mechanic's profile page.
            }

        } catch(error) {
            alert(error);
        }
        console.log(formData);
        setFormData(initialFormState);
        setTouched({})
        document.activeElement.blur();
    }

    return (
        <div>
            <p>This is the mechanic registration form</p>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Personal Information</legend>
                        <input
                            id="mechanic-firstName"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            onBlur={(e) => setTouched(prev => ({
                                    ...prev,
                                    [e.target.name]: true,
                                }))
                            }
                            placeholder="Enter firstname"
                        />

                        {touched.firstName && !formData.firstName
                            && (<p style={{color:"red"}}>Please enter your first name</p>)
                        }

                        <br />

                        <input
                            id="mechanic-lastName"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            onBlur={(e) => setTouched(prev => ({
                                    ...prev,
                                    [e.target.name]: true,
                                }))
                            }
                            placeholder="Enter last name"
                        />

                        {touched.lastName && !formData.lastName
                            && (<p style={{color:"red"}}>Please enter your last name</p>)
                        }

                        <br />

                        <input
                            id="mechanic-phoneNumber"
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            onBlur={(e) => setTouched(prev => ({
                                    ...prev,
                                    [e.target.name]: true,
                                }))
                            }
                            placeholder="Enter phone number"
                        />

                        {touched.phoneNumber && !formData.phoneNumber
                            && (<p style={{color:"red"}}>Please enter your phone number</p>)
                        }

                        <br />

                        <input
                            id="mechanic-email"
                            // type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={(e) => setTouched(prev => ({
                                    ...prev,
                                    [e.target.name]: true,
                                }))
                            }
                            placeholder="Enter email address"
                        />

                        {emailError
                            && (<p style={{color:"red"}}>{emailError}</p>)
                        }

                        {touched.email && !formData.email
                            && (<p style={{color:"red"}}>Please enter email address</p>)
                        }

                </fieldset>

                <br />

                <fieldset>
                    <legend>Address</legend>
                        <select
                            id="region-select"
                            name="region"
                            value={formData.region}
                            onChange={(e) => handleRegionSelection(e)}
                            onBlur={(e) => setTouched(prev => ({
                                    ...prev,
                                    [e.target.name]: true,
                                }))
                            }
                        >
                            {regions.length === 0
                                && <option value="" disabled>Regions loading...</option>
                            }

                            <option value="" disabled>Select region</option>

                            {regions.map((region) =>
                                <option key={region} value={region}>{region}</option>
                            )}


                        </select>

                        {touched.region && !formData.region
                            && (<p style={{color:'red'}}>Region is required</p>)
                        }

                        <br />

                        {selectedRegion === 'NATIONAL CAPITAL REGION (NCR)' ?
                            (
                                <div>
                                    <select
                                        id="city-select"
                                        name="city"
                                        value={formData.city}
                                        onChange={(e) => handleCitySelection(e)}
                                        onBlur={(e) => setTouched(prev => ({
                                                ...prev,
                                                [e.target.name]: true,
                                            }))
                                        }
                                    >

                                        <option value="" disabled>Select city/town</option>

                                        {cities.length !== 0 &&
                                            cities.map((city) => (
                                                <option key={city} value={city}>
                                                    {city}
                                                </option>
                                            ))
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
                                        onChange={(e) => handleBarangaySelection(e)}
                                        onBlur={(e) => setTouched(prev => ({
                                                ...prev,
                                                [e.target.name]: true,
                                            }))
                                        }
                                    >

                                        <option value="" disabled>Select barangay</option>

                                        {barangays.length !== 0 &&
                                            barangays.map((barangay) => (
                                                <option key={barangay} value={barangay}>
                                                    {barangay}
                                                </option>
                                            ))
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
                                        onChange={(e) => handleProvinceSelection(e)}
                                        onBlur={(e) => setTouched(prev => ({
                                                ...prev,
                                                [e.target.name]: true,
                                            }))
                                        }
                                    >
                                        <option value="" disabled>Select province</option>

                                        {provinces.length !== 0 &&
                                            provinces.map((province) => (
                                                <option key={province} value={province}>
                                                    {province}
                                                </option>
                                            ))
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
                                        onChange={(e) => handleCitySelection(e)}
                                        onBlur={(e) => setTouched(prev => ({
                                                ...prev,
                                                [e.target.name]: true,
                                            }))
                                        }
                                    >

                                        <option value="" disabled>Select city/town</option>

                                        {cities.length !== 0 &&
                                            cities.map((city) => (
                                                <option key={city} value={city}>
                                                    {city}
                                                </option>
                                            ))
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
                                        onChange={(e) => handleBarangaySelection(e)}
                                        onBlur={(e) => setTouched(prev => ({
                                                ...prev,
                                                [e.target.name]: true,
                                            }))
                                        }
                                    >

                                        <option value="" disabled>Select barangay</option>

                                        {barangays.length !== 0 &&
                                            barangays.map((barangay) => (
                                                <option key={barangay} value={barangay}>
                                                    {barangay}
                                                </option>
                                            ))
                                        }
                                    </select>

                                    {touched.barangay && !formData.barangay &&
                                        (<p style={{color:'red'}}>Barangay is required</p>)
                                    }
                                </div>
                            )
                        }
                </fieldset>
                <br />
                <button type="Submit">Submit</button>
            </form>
        </div>

    );
}
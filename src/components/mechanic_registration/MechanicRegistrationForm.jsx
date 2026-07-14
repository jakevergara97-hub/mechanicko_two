import { useState, useEffect, useRef } from "react";
import { createMechanic } from "../../services/mechanicService";

export function MechanicRegistrationForm() {
    const [touchedFirstName, setTouchedFirstName] = useState(false);
    const [touchedLastName, setTouchedLastName] = useState(false);
    const [touchedPhoneNumber, setTouchedPhoneNumber] = useState(false);

    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const [locationHierarchy, setLocationHierarchy] = useState({});

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [barangays, setBarangays] = useState([]);

    const initialFormState = {
        firstName: '',
        lastName: '',
        phoneNumber: '',

        region: '',
        province: '',
        city: '',
        barangay: '',
    }

    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            }
        });
    }

    useEffect(() => {
        async function loadPSGC() {
            try{
                const response = await fetch("./psgc.json");

                if(!response.ok) {
                    throw new Error("Locations can't be loaded.");
                }
                const data = await response.json();
                console.log(locationHierarchy);
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

        setFormData((prevData) => {
            return {
                ...prevData,
                barangay,
            }
        });
    }

    const regions = Object.keys(locationHierarchy);

    async function handleSubmit(e) {
        e.preventDefault();

        let { firstName,
                lastName,
                phoneNumber,
                province,
                city,
                barangay,
            } = formData;

        for(const value of Object.values(formData)) {
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

        setFormData(initialFormState);
        document.activeElement.blur();
        setTouchedFirstName(false);
        setTouchedLastName(false);
        setTouchedPhoneNumber(false);
    }

    return (
        <div>
            <p>This is the mechanic registration form</p>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Personal Information</legend>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            onBlur={() => setTouchedFirstName(true)}
                            placeholder="Enter firstname"
                        />

                        {touchedFirstName && formData.firstName === '' &&
                            (<p style={{color:"red"}}>Please enter your first name</p>)
                        }

                        <br />

                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            onBlur={() => setTouchedLastName(true)}
                            placeholder="Enter last name"
                        />

                        {touchedLastName && formData.lastName === '' &&
                            (<p style={{color:"red"}}>Please enter your last name</p>)
                        }

                        <br />

                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            onBlur={() => setTouchedPhoneNumber(true)}
                            placeholder="Enter phone number"
                        />

                        {touchedPhoneNumber && formData.phoneNumber === '' &&
                            (<p style={{color:"red"}}>Please enter your phone number</p>)
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
                        >
                            {regions.length === 0 && <option value="" disabled>Regions loading...</option>}

                            <option value="" disabled>Select region</option>

                            {regions.map((region) =>
                                <option key={region} value={region}>{region}</option>
                            )}


                        </select>

                        <br />

                        {selectedRegion === 'NATIONAL CAPITAL REGION (NCR)' ?
                            (
                                <div>
                                    <select
                                        id="city-select"
                                        name="city"
                                        value={formData.city}
                                        onChange={(e) => handleCitySelection(e)}
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
                                    <br />
                                    <select
                                        id="barangay-select"
                                        name="barangay"
                                        value={formData.barangay}
                                        onChange={(e) => handleBarangaySelection(e)}
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
                                    <br />
                                    <select
                                        id="city-select"
                                        name="city"
                                        value={formData.city}
                                        onChange={(e) => handleCitySelection(e)}
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
                                    <br />
                                    <select
                                        id="barangay-select"
                                        name="barangay"
                                        value={formData.barangay}
                                        onChange={(e) => handleBarangaySelection(e)}
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
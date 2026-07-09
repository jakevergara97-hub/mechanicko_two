import { useState, useEffect, useRef } from "react";
import { createMechanic } from "../../services/mechanicService";

export function MechanicRegistrationForm() {
    const [touchedFirstName, setTouchedFirstName] = useState(false);
    const [touchedLastName, setTouchedLastName] = useState(false);
    const [touchedPhoneNumber, setTouchedPhoneNumber] = useState(false);

    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedBarangay, setSelectedBarangay] = useState("");

    const selectedRegionRef = useRef("");
    const selectedProvinceRef = useRef("");
    const selectedCityRef = useRef("");
    const selectedBarangayRef = useRef("");

    const [locationHierarchy, setLocationHierarchy] = useState({});

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [barangays, setBarangays] = useState([]);

    const initialFormState = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
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
                console.log(error.message);
            }

        }
        loadPSGC();
    }, []);

    function handleRegionSelection(e) {
        const region = e.target.value;
        setSelectedRegion(region);

        setProvinces(
            Object.keys(locationHierarchy[region]).filter(province => province !== "population")
        );
    }

    function handleProvinceSelection(e) {
        const province = e.target.value;
        setSelectedProvince(province);

        setCities(
            Object.keys(locationHierarchy[selectedRegion][province]).filter(city => city !== 'population')
        );

    }

    function handleCitySelection(e) {
        const city = e.target.value;
        setSelectedCity(city);

        setBarangays(
            Object.keys(locationHierarchy[selectedRegion][selectedProvince][city])
                .filter(barangay =>
                        barangay !== "cityClass"
                        && barangay !== "class"
                        && barangay !== "population")
        );
    }

    const regions = Object.keys(locationHierarchy);

    // console.log(provinces);
    // console.log(locationHierarchy);
    // console.log(selectedRegion)
    // console.log(selectedProvince);
    // console.log(cities);
    // console.log(barangays);

    async function handleSubmit(e) {
        e.preventDefault();

        const { firstName,
                lastName,
                phoneNumber,
            } = formData;

        if( firstName === '' ||
            lastName === '' ||
            phoneNumber === '') {
            return;
        }

        try {

            const response = await createMechanic({
                firstName,
                lastName,
                phoneNumber,
                province: selectedProvince,
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
                            (<p>Please enter your first name</p>)
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
                            (<p>Please enter your last name</p>)
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
                            (<p>Please enter your phone number</p>)
                        }

                </fieldset>

                <br />

                <fieldset>
                    <legend>Address</legend>
                        <select
                            id="region-select"
                            value={selectedRegion}
                            // ref={selectedRegionRef}
                            onChange={(e) => handleRegionSelection(e)}
                        >
                            {regions.length === 0 && <option value="" disabled>Regions loading...</option>}

                            <option value="" disabled>Select region</option>

                            {regions.map((region) =>
                                <option key={region}>{region}</option>
                            )}


                        </select>

                        <br />

                        <select
                            id="province-select"
                            value={selectedProvince}
                            // ref={selectedProvinceRef}
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
                            value={selectedCity}
                            ref={selectedCityRef}
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
                            value={selectedBarangay}
                            ref={selectedBarangayRef}
                            onChange={(e) => setSelectedBarangay(e.target.value)}
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
                </fieldset>
                <br />


                <button type="Submit">Submit</button>
            </form>
        </div>

    );
}
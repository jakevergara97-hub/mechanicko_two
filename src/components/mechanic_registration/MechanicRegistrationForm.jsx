import { useState, useEffect, useRef } from "react";
import { createMechanic } from "../../services/mechanicService";

export function MechanicRegistrationForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [touchedFirstName, setTouchedFirstName] = useState(false);
    const [touchedLastName, setTouchedLastName] = useState(false);

    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedBarangay, setSelectedBarangay] = useState("");

    const selectedRegionRef = useRef("");
    const selectedProvinceRef = useRef("");
    const selectedCityRef = useRef("");
    const selectedBarangayRef = useRef("");

    const firstNameRef = useRef("");
    const lastNameRef = useRef("");

    const [locationHierarchy, setLocationHierarchy] = useState({});

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [barangays, setBarangays] = useState([]);

    const initialFormState = {
        firstName_: '',
        lastName_: '',
    }

    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (event) => {
        const {name, value} = event.target;
        // setFormData((prevData) => ({
        //     ...prevData,
        //     [name]: value,
        // }))

        setFormData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            }
        });

        console.log("Handling Change function firing " + value)
    }

    console.log(initialFormState.firstName_);

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

    console.log(provinces);
    console.log(locationHierarchy);
    console.log(selectedRegion)
    console.log(selectedProvince);
    console.log(cities);
    console.log(barangays);

    async function handleSubmit(e) {
        e.preventDefault();
        if(firstNameRef.current.value === "" || lastNameRef.current.value === "") {
            return;
        }

        console.log(firstNameRef.current.value);
        console.log(lastNameRef.current.value);

        try {
            const response = await createMechanic({
                firstName,
                lastName,
                region: selectedRegionRef.current.value
            });

            console.log(response);
            if(response.success) {
                console.log("success");
            }

        } catch(error) {
            alert(error);
        }


        document.activeElement.blur();

        firstNameRef.current.value = "";
        setTouchedFirstName(false);
        setFirstName("");

        lastNameRef.current.value = "";
        setTouchedLastName(false);
        setLastName("");
    }


    return (
        <div>
            <p>This is the mechanic registration form</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={firstName}
                    // value={formData.firstName_}
                    // name="firstname_"
                    ref={firstNameRef}
                    onChange={(e) => setFirstName(e.target.value)}
                    // onChange={handleChange}
                    onBlur={() => setTouchedFirstName(true)}
                    placeholder="First Name"
                />
                {touchedFirstName && firstName === "" &&
                    (<p>Please enter your first name</p>)
                }

                <br />

                <input
                    type="text"
                    value={lastName}
                    ref={lastNameRef}
                    onChange={(e) => setLastName(e.target.value)}
                    onBlur={() => setTouchedLastName(true)}
                    placeholder="Last Name"
                />
                {touchedLastName && lastName === "" &&
                    (<p>Please enter your last name</p>)
                }
                <br />

                <select
                    id="region-select"
                    value={selectedRegion}
                    ref={selectedRegionRef}
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
                    ref={selectedProvinceRef}
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

                <br />


                <button type="Submit">Submit</button>
            </form>
        </div>

    );
}
import { useState, useEffect, useRef } from "react";
import { createMechanic } from "../../services/createMechanicService";
import { PersonalInformation } from "./PersonalInformation";
import { AddressInformation } from "./AddressInformation";

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

        if(name === 'email' && touched.email) {
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
            setEmailError('Please enter a valid email address');
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
                    <PersonalInformation
                        handleChange={handleChange}
                        formData={formData}
                        setFormData={setFormData}
                        touched={touched}
                        setTouched={setTouched}
                        emailError={emailError}
                    />
                </fieldset>

                <br />

                <fieldset>
                    <legend>Address</legend>
                    <AddressInformation
                            regions={regions}
                            provinces={provinces}
                            cities={cities}
                            barangays={barangays}

                            formData={formData}
                            setFormData={setFormData}
                            touched={touched}
                            setTouched={setTouched}

                            handleRegionSelection={handleRegionSelection}
                            handleProvinceSelection={handleProvinceSelection}
                            handleCitySelection={handleCitySelection}
                            handleBarangaySelection={handleBarangaySelection}

                            selectedRegion={selectedRegion}

                        />
                </fieldset>
                <br />
                <button type="Submit">Submit</button>
            </form>
        </div>

    );
}
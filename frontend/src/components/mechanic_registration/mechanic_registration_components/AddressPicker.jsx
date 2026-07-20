import { useState, useEffect, useRef } from "react";

export function AddressPicker() {
    const [locationHierarchy, setLocationHierarchy] = useState({});

    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [barangays, setBarangays] = useState([]);

    const [region, setRegion] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [barangay, setBarangay] = useState("");

    const initialFormState = {
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
                setLocationHierarchy(data);
            }
            catch(error) {
                alert(error.message);
            }

        }
        loadPSGC();
    }, []);

    const regions = Object.keys(locationHierarchy);

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

    return (
        <div>
            <h1>Address Picker</h1>
            <select
                id="region-select"
                name="region"
                value={formData.region}
                onChange={(e) => handleRegionSelection(e)}
            >
                {regions.length === 0
                    && <option value="" disabled>Regions loading...</option>
                }

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

            {/* Put a find mechanic component here passing props. Example */}
            {/* <FindMechanic customerLocation={customerLocation} */}
            {/* customerLocation = {
                province: formData.province,
                city: formData.city,
                barangay: formData.barangay
            } */}
        </div>
    );
}
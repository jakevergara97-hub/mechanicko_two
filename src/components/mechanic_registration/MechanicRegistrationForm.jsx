import { useState, useEffect, useRef } from "react";
import { createMechanic } from "../../services/mechanicService";

export function MechanicRegistrationForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [touchedFirstName, setTouchedFirstName] = useState(false);
    const [touchedLastName, setTouchedLastName] = useState(false);

    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");

    const selectedRegionRef = useRef("");
    const selectedProvinceRef = useRef("");
    const firstNameRef = useRef("");
    const lastNameRef = useRef("");

    const [locationHierarchy, setLocationHierarchy] = useState({});

    const [isRegionSelected, setIsRegionSelected] = useState(false);

    const [provinces, setProvinces] = useState(null);

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
                console.log(error.message);
            }

        }
        loadPSGC();
    }, []);

    function handleRegionSelection(e) {
        const region = e.target.value;
        setSelectedRegion(region);

        setIsRegionSelected(true);

        setProvinces(locationHierarchy[region]);
    }

    const regions = Object.keys(locationHierarchy);

    console.log(provinces);
    console.log(typeof(provinces))

    async function handleSubmit(e) {
        e.preventDefault();
        if(firstNameRef.current.value === "" || lastNameRef.current.value === "") {
            return;
        }

        console.log(firstNameRef.current.value);
        console.log(lastNameRef.current.value);

        try {
            const response = await createMechanic({
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
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
                    ref={firstNameRef}
                    onChange={(e) => setFirstName(e.target.value)}
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
                    onChange={(e) => setSelectedProvince(e.target.value)}>

                    {isRegionSelected ?
                        Object.keys(provinces).map((key) => (
                            <option key={key} value={key}>
                                {key}
                            </option>
                        ))
                        :
                        <option value="" disabled>Select province</option>
                    }

                </select>

                <br />


                <button type="Submit">Submit</button>
            </form>
        </div>

    );
}
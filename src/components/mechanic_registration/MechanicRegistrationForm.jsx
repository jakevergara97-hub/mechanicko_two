import { useState, useEffect, useRef } from "react";

export function MechanicRegistrationForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [touchedFirstName, setTouchedFirstName] = useState(false);
    const [touchedLastName, setTouchedLastName] = useState(false);
    const firstNameRef = useRef("");
    const lastNameRef = useRef("");

    function handleSubmit(e) {
        e.preventDefault();
        if(firstNameRef.current.value === "" || lastNameRef.current.value === "") {
            return;
        }
        document.activeElement.blur();
        console.log(firstNameRef.current.value);
        console.log(lastNameRef.current.value);

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

                <button type="Submit">Submit</button>
            </form>
        </div>
    );
}
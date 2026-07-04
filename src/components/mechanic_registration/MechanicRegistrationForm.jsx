import { useState, useEffect, useRef } from "react";
import { createMechanic } from "../../services/mechanicService";

export function MechanicRegistrationForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [touchedFirstName, setTouchedFirstName] = useState(false);
    const [touchedLastName, setTouchedLastName] = useState(false);
    const firstNameRef = useRef("");
    const lastNameRef = useRef("");

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
                lastName: lastNameRef.current.value
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
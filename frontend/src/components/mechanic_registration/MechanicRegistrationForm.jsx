import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { createMechanic } from "../../services/createMechanicService";
import { PersonalInformation } from "./PersonalInformation";
import { AddressInformation } from "./AddressInformation";
import { MechanicServicesForm } from "./MechanicServicesForm";

export function MechanicRegistrationForm() {
    const navigate = useNavigate();
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const {mechanic, setMechanic} = useContext(AuthContext);

    const initialFormState = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',

        region: '',
        province: '',
        city: '',
        barangay: '',

        services: [],
    }

    const [formData, setFormData] = useState(initialFormState);

    async function handleSubmit(e) {
        e.preventDefault();

        let { firstName,
                lastName,
                phoneNumber,
                email,
                password,
                confirmPassword,
                region,
                province,
                city,
                barangay,
                services
            } = formData;

        if(confirmPasswordError) {
            return;
        }

        for(const [key, value] of Object.entries(formData)) {
            if(key === 'province') {
                continue;
            }

            if(value === '') {
                return;
            }
        }

        if(services.length === 0) {
            return;
        }

        try {
            const data = await createMechanic({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                phoneNumber: phoneNumber.trim(),
                email: email.trim(),
                password,
                region,
                province,
                city,
                barangay,
                services,
            });

            if(data.success) {
                console.log("success");
                setMechanic(data);
                navigate("/mechanicdashboard")
            }

        } catch(error) {
            alert(error.message);
        }
        setFormData(initialFormState);
        document.activeElement.blur();
    }

    return (
        <div>
            <p>This is the mechanic registration form</p>
            <form onSubmit={handleSubmit} autoComplete="off">
                <fieldset>
                    <legend>Personal Information</legend>
                    <PersonalInformation
                        formData={formData}
                        setFormData={setFormData}
                        confirmPasswordError={confirmPasswordError}
                        setConfirmPasswordError={setConfirmPasswordError}
                        />
                </fieldset>
                <br />

                <fieldset>
                    <legend>Address</legend>
                    <AddressInformation formData={formData} setFormData={setFormData} />
                </fieldset>
                <br />

                <fieldset>
                    <legend>Services</legend>
                    <MechanicServicesForm formData={formData} setFormData={setFormData} />
                </fieldset>
                <br />

                <button type="Submit">Submit</button>
            </form>
        </div>

    );
}
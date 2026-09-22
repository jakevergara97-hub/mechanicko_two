import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { createMechanic } from "../../services/createMechanicService";
import { PersonalInformation } from "./PersonalInformation";
import { AddressInformation } from "./AddressInformation";
import { MechanicServicesForm } from "./MechanicServicesForm";
import { MechanicCarBrandForm } from "./MechanicCarBrandForm";
import { toTitleCase } from "../../utils/toTitleCase";
import { mergeArrays } from "../../utils/mergeArrays";

export function MechanicRegistrationForm() {
    const navigate = useNavigate();
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const {mechanic, setMechanic} = useContext(AuthContext);
    const [errors, setErrors] = useState({
        confirmPasswordError: '',
        addressError: '',
        servicesError: '',
        mechanicCarBrandsError: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        carBrands: [],
        otherCarBrands: [],
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
                services,
                carBrands,
                otherCarBrands
            } = formData;

        for(const [key, value] of Object.entries(formData)) {
            if(key === 'province') {
                continue;
            }
            if(value === '' || !value) {
                setErrors((prevData) => {
                    return {
                        ...prevData,
                        [`${key}Error`]: `${toTitleCase(key)} field is not complete`
                    }
                })
            } else {
                setErrors((prevData) => {
                    return {
                        ...prevData,
                        [`${key}Error`]: ``
                    }
                })
            }
        }

        if(services.length === 0) {
            setErrors((prevData) => {
                return {
                    ...prevData,
                    servicesError: `Services field is not complete`
                }
            })
        }else {
            setErrors((prevData) => {
                return {
                    ...prevData,
                    servicesError: ``
                }
            })
        }

        const mechanicCarBrands = carBrands.length !== 0 || otherCarBrands.length !== 0 ?
                    mergeArrays([carBrands, otherCarBrands])
                    :
                    [];

        if(mechanicCarBrands.length === 0) {
            setErrors((prevData) => {
                return {
                    ...prevData,
                    mechanicCarBrandsError: `Car brands field is not complete`
                }
            })
        }else {
            setErrors((prevData) => {
                return {
                    ...prevData,
                    mechanicCarBrandsError: ``
                }
            })
        }

        for(const [key, value] of Object.entries(errors)) {
            if(value !== ''){
                return;
            }
        }

        try {
            setIsSubmitting(true);
            const data = await createMechanic({
                firstName: firstName.trim().toLowerCase(),
                lastName: lastName.trim().toLowerCase(),
                phoneNumber: phoneNumber.trim(),
                email: email.trim().toLowerCase(),
                password,
                region,
                province,
                city,
                barangay,
                services,
                mechanicCarBrands
            });

            if(data.success) {
                console.log("success");
                setFormData(initialFormState);
                setMechanic(data);
                navigate("/mechanicdashboard");
            }

        } catch(error) {
            alert(error.message);
        } finally {
            setIsSubmitting(false);
        }
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
                        errors={errors}
                        setErrors={setErrors}
                        />
                </fieldset>
                <br />

                <fieldset>
                    <legend>Address</legend>
                    <AddressInformation
                        formData={formData}
                        setFormData={setFormData} />
                </fieldset>
                <br />

                <fieldset>
                    <legend>Services</legend>
                    <MechanicServicesForm formData={formData} setFormData={setFormData} />

                </fieldset>
                <br />

                <fieldset>
                    <legend>Car Brands Experienced With</legend>
                    <MechanicCarBrandForm formData={formData} setFormData={setFormData} />
                </fieldset>
                <br />
                <div>
                    {errors &&
                        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                            {Object.values(errors).map((error, index) => (
                                <li key={index} style={{ color: 'red' }}>{error}</li>
                            ))}
                        </ul>
                    }
                </div>
                {!isSubmitting ?
                    <button>Submit</button>
                    :
                    <button disabled={isSubmitting}>Submitting...</button>
                }
            </form>
        </div>
    );
}
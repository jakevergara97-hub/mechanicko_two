import { useState } from "react";

export function PersonalInformation({ formData,
                                    setFormData,
                                    confirmPasswordError,
                                    setConfirmPasswordError }) {

    const [touched, setTouched] = useState({});
    const [emailError, setEmailError] = useState('');
    // const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handleChange = (event) => {
        let {name, value} = event.target;

        if(name === 'email') {
            validateEmail(value);

            if(!emailError) {
                setFormData((prevData) => {
                    return {
                        ...prevData,
                        [name]: value
                    }
                });
            }
        }

        if(name === 'confirmPassword') {
            validateConfirmPassword(value);

            if(!confirmPasswordError) {
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

    const validateConfirmPassword = (value) => {
        if(value !== formData.password) {
            setConfirmPasswordError('Passwords are not the same');
        } else {
            setConfirmPasswordError('');
        }
    }

    return (
        <div>
            <input
                id="mechanic-firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}

                onBlur={(e) => setTouched({
                        ...touched,
                        firstName: true,
                    })}

                placeholder="Enter first name"
            />

            {touched.firstName && !formData.firstName
                && (<p style={{color:"red"}}>Please enter your first name</p>)
            }

            <br />

            <input
                id="mechanic-lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}

                onBlur={(e) => setTouched({
                        ...touched,
                        lastName: true,
                    })}

                placeholder="Enter last name"
            />

            {touched.lastName && !formData.lastName
                && (<p style={{color:"red"}}>Please enter your last name</p>)
            }

            <br />

            <input
                id="mechanic-phoneNumber"
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}

                onBlur={(e) => setTouched({
                        ...touched,
                        phoneNumber: true,
                    })}

                placeholder="Enter phone number"
            />

            {touched.phoneNumber && !formData.phoneNumber
                && (<p style={{color:"red"}}>Please enter your phone number</p>)
            }

            <br />

            <input
                id="mechanic-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}

                onBlur={(e) => setTouched({
                        ...touched,
                        email: true,
                    })}

                placeholder="Enter email address"
                required
            />

            {touched.email && !formData.email
                && (<p style={{color:"red"}}>Please enter your email addess</p>)
            }

            {emailError
                && (<p style={{color:"red"}}>{emailError}</p>)
            }

            <br />

            <input
                id="mechanic-password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}

                onBlur={(e) => setTouched({
                        ...touched,
                        password: true,
                    })}

                placeholder="Enter your password"
            />

            {touched.password && formData.password === ""
                && (<p style={{color:"red"}}>Please enter your password</p>)
            }

            <br />
            <input
                id="mechanic-confirm-password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={(e) => setTouched({
                        ...touched,
                        confirmPassword: true
                    })}

                placeholder="Confirm your password"
            />

            {touched.confirmPassword && formData.confirmPassword === ""
                && (<p style={{color:"red"}}>Please confirm your password</p>)
            }

            {confirmPasswordError
                && (<p style={{color:"red"}}>{confirmPasswordError}</p>)
            }

        </div>
    );
}
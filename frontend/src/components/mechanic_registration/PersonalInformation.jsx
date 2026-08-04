export function PersonalInformation({
                                    handleChange,
                                    formData,
                                    setFormData,
                                    touched,
                                    setTouched,
                                    emailError,
                                    confirmPasswordError
                                    }) {

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

            {touched.password && !formData.password
                && (<p style={{color:"red"}}>Please enter your password</p>)
            }

            <br />
            <input
                id="mechanic-confirm-password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                // autoComplete="new-password"
                onBlur={(e) => setTouched({
                        ...touched,
                        confirmPassword: true
                    })}

                placeholder="Confirm your password"
            />

            {touched.confirmPassword && !formData.confirmPassword
                && (<p style={{color:"red"}}>Please confirm your password</p>)
            }

            {confirmPasswordError
                && (<p style={{color:"red"}}>{confirmPasswordError}</p>)
            }

        </div>
    );
}
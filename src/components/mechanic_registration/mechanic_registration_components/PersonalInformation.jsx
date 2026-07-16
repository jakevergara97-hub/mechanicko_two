export function PersonalInformation({
                                    handleChange,
                                    formData,
                                    setFormData,
                                    touched,
                                    setTouched,
                                    emailError
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
            />
            {emailError
                && (<p style={{color:"red"}}>{emailError}</p>)
            }

            {touched.email && !formData.email
                && (<p style={{color:"red"}}>Please enter your email addess</p>)
            }

        </div>
    );
}
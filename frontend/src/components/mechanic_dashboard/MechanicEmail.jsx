import { useState, useEffect } from "react";
import { updateMechanic } from "../../services/updateMechanicService";

export function MechanicEmail({mechanic}) {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if(mechanic?.mechanicInfo) {
            setEmail(mechanic.mechanicInfo.email);
        }
    },[mechanic]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        validateEmail(value);

        setEmail(value);
    }

    const handleEmailSave = async () => {
        const id = mechanic.mechanicInfo.id;

        try{
            if(emailError.length > 0) {
                return;
            }

            const data = await updateMechanic(id, {email: email.trim()});

            if(data.success) {
                mechanic.mechanicInfo.email = data.mechanic.email;
                setEmail(data.mechanic.email);
                setIsEditing(false);
            }

        }catch(error) {
            alert(error);
        }

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

    const handleCancel = () => {
        setEmail(mechanic.mechanicInfo.email);
        setIsEditing(false);
    }

    return (
        <>
            <div>
                {isEditing ?
                    <>
                        <input
                            id="mechanic-email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                        ></input>

                        <button onClick={handleEmailSave}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </>
                    :
                    <>
                        <h4>Email: {mechanic.mechanicInfo.email}</h4>
                        <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
                    </>
                }

                {emailError && <p>{emailError}</p>}
            </div>
        </>
    );
}
import { useEffect, useState } from "react";
import { updateMechanic } from "../../services/updateMechanicService";

export function MechanicEmail({mechanic}) {
    const [email, setEmail] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if(mechanic?.mechanicInfo) {
            setEmail(mechanic.mechanicInfo.email);
        }
    },[mechanic]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmail(value);
    }

    const handleEmailSave = async () => {
        const id = mechanic.mechanicInfo.id;

        try{
            const data = await updateMechanic(id, {email});

            if(data.success) {
                mechanic.mechanicInfo.email = data.data.email;
                setIsEditing(false);
            }

        }catch(error) {
            alert(error);
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
            </div>
        </>
    )
}
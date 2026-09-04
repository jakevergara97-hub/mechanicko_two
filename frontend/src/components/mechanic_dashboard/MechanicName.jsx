import { useState, useEffect } from "react";
import { updateMechanic } from "../../services/updateMechanicService";
import { toTitleCase } from "../../utils/toTitleCase";

export function MechanicName({mechanic}) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if(mechanic?.mechanicInfo) {
            setFormData({
                firstName: mechanic.mechanicInfo.first_name[0].toUpperCase()
                        + mechanic.mechanicInfo.first_name.slice(1),
                lastName: mechanic.mechanicInfo.last_name[0].toUpperCase()
                        + mechanic.mechanicInfo.last_name.slice(1)
            })
        }
    },[]);

    const fullName = toTitleCase(`${mechanic.mechanicInfo.first_name} ${mechanic.mechanicInfo.last_name}`);

    const handleChange = (e) => {
        let {name, value} = e.target;

        setFormData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            }
        });
    }

    const handleNameSave = async () => {
        let {firstName, lastName} = formData;

        const id = mechanic.mechanicInfo.id;
        try{
            const data = await updateMechanic(id, {firstName: firstName.trim(), lastName: lastName.trim()});

            if(data.success) {
                console.log(data);
                mechanic.mechanicInfo.first_name = data.mechanic.first_name;
                mechanic.mechanicInfo.last_name = data.mechanic.last_name;
                setFormData({
                    firstName: toTitleCase(data.mechanic.first_name),
                    lastName: toTitleCase(data.mechanic.last_name)
                });
                setIsEditing(false);
            }

        } catch(error) {
            alert(error);
        }
    }

    const handleCancel = (e) => {
        formData.firstName = toTitleCase(mechanic.mechanicInfo.first_name);
        formData.lastName = toTitleCase(mechanic.mechanicInfo.last_name);
        setIsEditing(false);
    }

    return (
        <>
            <div>
                {isEditing ?
                    <>
                        <input
                            id="mechanic-firstName"
                            type="text"
                            name="firstName"
                            value={formData?.firstName}
                            onChange={handleChange}
                        ></input>

                        <input
                            id="mechanic-lastName"
                            type="text"
                            name="lastName"
                            value={formData?.lastName}
                            onChange={handleChange}
                        ></input>

                        <button onClick={handleNameSave}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </>
                    :
                    <>
                        <h3>Welcome {fullName}!</h3>
                        <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
                    </>
                }
            </div>
        </>
    );
}
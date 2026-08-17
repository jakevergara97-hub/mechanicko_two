import { useState, useEffect } from "react";
import { editMechanicName } from "../../services/editMechanicNameService";

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
    },[mechanic]);

    const firstName = mechanic.mechanicInfo.first_name[0].toUpperCase()
                        + mechanic.mechanicInfo.first_name.slice(1);
    const lastName = mechanic.mechanicInfo.last_name[0].toUpperCase()
                        + mechanic.mechanicInfo.last_name.slice(1);
    const fullName = firstName + " " + lastName;

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
        const {firstName, lastName} = formData;
        const id = mechanic.mechanicInfo.id;
        try{
            const data = await editMechanicName({id, firstName, lastName});

            if(data.success) {
                console.log(data);
                mechanic.mechanicInfo.first_name = formData.firstName;
                mechanic.mechanicInfo.last_name = formData.lastName;
                setIsEditing(false);
            }

        } catch(error) {
            alert(error);
        }
    }

    const handleCancel = (e) => {
        formData.firstName = mechanic.mechanicInfo.first_name;
        formData.lastName = mechanic.mechanicInfo.last_name;
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
    )
}
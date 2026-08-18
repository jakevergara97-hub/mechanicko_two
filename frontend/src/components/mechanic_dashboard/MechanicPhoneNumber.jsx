import { useState, useEffect } from "react";
import { editMechanicNumber } from "../../services/editMechanicNumberService";

export function MechanicPhoneNumber({mechanic}){
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if(mechanic?.mechanicInfo) {
            setPhoneNumber(mechanic.mechanicInfo.phone_number)
        }
    },[mechanic]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPhoneNumber(value);
    }

    const handleNumberSave = async () => {
        const id = mechanic.mechanicInfo.id;

        try {
            const data = await editMechanicNumber({id, phoneNumber});

            if(data.success) {
                mechanic.mechanicInfo.phone_number = data.data.phone_number;
                setIsEditing(false);
            }

        } catch(error) {
            alert(error);
        }
    }

    const handleCancel = () => {
        setPhoneNumber(mechanic.mechanicInfo.phone_number);
        setIsEditing(false);
    }

    return (
        <>
            <div>
                {isEditing ?
                    <>
                        <input
                            id="mechanic-phoneNumber"
                            type="text"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={handleChange}
                        ></input>

                        <button onClick={handleNumberSave}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </>
                    :
                    <>
                        <h4>Phone Number: {mechanic.mechanicInfo.phone_number}</h4>
                        <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
                    </>
                }
            </div>
        </>
    )
}
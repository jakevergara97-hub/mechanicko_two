import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Logout } from "../components/common/MechanicLogout";
import { editMechanicName } from "../services/editMechanicNameService";

export function MechanicDashboard() {
    const {mechanic, loading} = useContext(AuthContext);
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

    if(loading) {
        return <p>Loading...</p>
    }

    if (!mechanic?.mechanicInfo) {
        return <p>Mechanic information unavailable.<br /><Link to={"/"}>Home</Link></p>;
    }

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

    return (
        <>
            <p>This is the mechanic dashboard page.</p>
            {!loading &&
                <div key={mechanic.mechanicInfo.id}>

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
                                <button>Cancel</button>
                            </>
                            :
                            <>
                                <h3>Welcome {fullName}!</h3>
                                <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
                            </>
                        }

                    </div>

                    <p>Phone number: {mechanic.mechanicInfo.phone_number}</p>

                    <p>Email: {mechanic.mechanicInfo.email}</p>

                    {mechanic.mechanicInfo.province &&  <p>Province: {mechanic.mechanicInfo.province}</p>}

                    <p>City: {mechanic.mechanicInfo.city}</p>

                    <p>Barangay: {mechanic.mechanicInfo.barangay}</p>
                </div>
            }
            <br />
            <br />
            <br />
            <Link to="/">
                Home
            </Link>
            <Logout />
        </>

    );
}


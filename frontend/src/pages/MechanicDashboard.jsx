import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Logout } from "../components/common/MechanicLogout";

export function MechanicDashboard() {
    const {mechanic, loading} = useContext(AuthContext);
    console.log(mechanic);

    if(loading) {
        return <p>Loading...</p>
    }

     if (!mechanic?.mechanicInfo) {
        return <p>Mechanic information unavailable.</p>;
    }

    const firstName = mechanic.mechanicInfo.first_name[0].toUpperCase()
                        + mechanic.mechanicInfo.first_name.slice(1);
    const lastName = mechanic.mechanicInfo.last_name[0].toUpperCase()
                        + mechanic.mechanicInfo.last_name.slice(1);
    const fullName = firstName + " " + lastName;

    return (
        <>
            <p>This is the mechanic dashboard page.</p>
            {!loading &&
                <div key={mechanic.mechanicInfo.id}>
                    <h3>Welcome {fullName}!</h3>
                    <p>Phone number: {mechanic.mechanicInfo.phone_number}</p>
                    <p>Email: {mechanic.mechanicInfo.email}</p>
                    <p>Province: {mechanic.mechanicInfo.province}</p>
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
            <Link to="/mechanicsignup">
                Register as a mechanic!
            </Link>
            <Logout />
        </>

    );
}


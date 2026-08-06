import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { MechanicProfileContext } from "../context/MechanicProfileContext";

export function MechanicDashboard() {
    const {mechanicProfile, setMechanicProfile} = useContext(MechanicProfileContext);

    console.log(mechanicProfile);

    return (
        <>
            <p>This is the mechanic dashboard page.</p>
            <Link to="/">
                Home
            </Link>
            <Link to="/mechanicsignup">
                Register as a mechanic!
            </Link>
        </>

    );
}


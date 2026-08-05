import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function MechanicDashboard() {
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


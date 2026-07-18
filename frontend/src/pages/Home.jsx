import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CustomerLocation } from "../components/home/CustomerLocation";

export function Home() {
    return (
        <>
            <p>This is the home page.</p>
            <CustomerLocation />
            <br />
            <Link to="/mechanicsignup">
                Register as a mechanic!
            </Link>
        </>
    );
}


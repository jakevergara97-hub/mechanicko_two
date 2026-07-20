import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CustomerLocation } from "../components/home/CustomerLocation";
import { AddressPicker } from "../components/mechanic_registration/mechanic_registration_components/AddressPicker";

export function Home() {
    return (
        <>
            <p>This is the home page.</p>
            <CustomerLocation />
            <AddressPicker />
            <br />
            <Link to="/mechanicsignup">
                Register as a mechanic!
            </Link>
        </>
    );
}


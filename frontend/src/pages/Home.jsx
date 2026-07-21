import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CustomerLocation } from "../components/home/CustomerLocation";
import { AddressPicker } from "../components/common/AddressPicker";
import { FindMechanicButton } from "../components/home/FindMechanicButton";
import { MechanicList } from "../components/home/MechanicsList";

export function Home() {
    return (
        <>
            <p>This is the home page.</p>
            <CustomerLocation />
            <AddressPicker />
            <FindMechanicButton />
            <MechanicList />
            <br />
            <Link to="/mechanicsignup">
                Register as a mechanic!
            </Link>
        </>
    );
}


import { useState, useEffect } from "react";
import { MechanicRegistrationForm } from "../components/mechanic_registration/MechanicRegistrationForm";
import { Link } from "react-router-dom";

export function MechanicRegistrationPage() {
    return (
        <>
        <p>This is the mechanic registration page!</p>
        {/* <Layout> <--- Preparing to send this to the layout component */}
            <MechanicRegistrationForm />
        {/* </Layout>*/}
        <Link to="/">
                Home
        </Link>
        </>
    );
}


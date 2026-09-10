import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AddressPicker } from "../components/common/AddressPicker";
import { FindMechanicButton } from "../components/home/FindMechanicButton";
import { MechanicList } from "../components/home/MechanicsList";
import { AuthContext } from "../context/AuthContext";
import { Logout } from "../components/common/MechanicLogout";

export function Home() {
    const { mechanic, loading } = useContext(AuthContext);

    if(loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <AddressPicker />
            <FindMechanicButton />
            <MechanicList />
            <br />
            {mechanic ?
                <div>
                    <Link to="/mechanicdashboard">
                        My Mechanic Profile
                    </Link>
                    <br />
                    <Logout />
                </div>
                :
                <div>
                    <Link to="/mechanicsignup">
                        Register as a mechanic!
                    </Link>
                    <br />
                    <Link to="/mechaniclogin">
                        Mechanic Login
                    </Link>
                </div>
            }
        </>
    );
}


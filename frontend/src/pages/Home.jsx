import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CustomerLocation } from "../components/home/CustomerLocation";
import { AddressPicker } from "../components/common/AddressPicker";
import { FindMechanicButton } from "../components/home/FindMechanicButton";
import { MechanicList } from "../components/home/MechanicsList";
import { Logout } from "../components/common/MechanicLogout";

export function Home() {
    const token = localStorage.getItem("token");

    return (
        <>
            {/* <CustomerLocation /> */}
            <AddressPicker />
            <FindMechanicButton />
            <MechanicList />
            <br />
            {token ?
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


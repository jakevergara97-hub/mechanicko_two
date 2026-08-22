import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Logout } from "../components/common/MechanicLogout";
import { MechanicName } from "../components/mechanic_dashboard/MechanicName";
import { MechanicPhoneNumber } from "../components/mechanic_dashboard/MechanicPhoneNumber";
import { MechanicEmail } from "../components/mechanic_dashboard/MechanicEmail";
import { MechanicAddress } from "../components/mechanic_dashboard/MechanicAddress";

export function MechanicDashboard() {
    const {mechanic, loading} = useContext(AuthContext);

    if(loading) {
        return <p>Loading...</p>
    }

    if (!mechanic?.mechanicInfo) {
        return <p>Mechanic information unavailable.<br /><Link to={"/"}>Home</Link></p>;
    }

    return (
        <>
            <p>This is the mechanic dashboard page.</p>
            {!loading &&
                <div key={mechanic.mechanicInfo.id}>
                    <MechanicName mechanic={mechanic} />
                    <MechanicPhoneNumber mechanic={mechanic} />
                    <MechanicEmail mechanic={mechanic} />
                    <MechanicAddress mechanic={mechanic} />
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


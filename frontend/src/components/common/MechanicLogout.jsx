import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function Logout() {
    const navigate = useNavigate();
    const { mechanic, setMechanic } = useContext(AuthContext)

    const handleClick = () => {
        localStorage.removeItem("token");
        setMechanic([]);
        navigate("/");
    }

    return (
        <>
            <button onClick={handleClick}>
                Logout
            </button>
        </>
    );
}
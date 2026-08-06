import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [mechanic, setMechanic] = useState([]);

    useEffect(() => {
        const getCurrentUser = async () => {
            const token = localStorage.getItem("token");
            console.log(token);
            if(!token) {
                console.log("No token")
                return;
            }
            const response = await fetch("http://localhost:3000/api/v1/mechanics/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();
            console.log(data);
            setMechanic(data);
        };
        getCurrentUser();

    }, []);

    return (
        <AuthContext.Provider
            value={{
                mechanic,
                setMechanic
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
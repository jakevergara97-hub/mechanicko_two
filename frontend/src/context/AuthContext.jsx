import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [mechanic, setMechanic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProfile = async () => {
            try{
                const response = await fetch("http://localhost:3000/api/v1/mechanics/me", {
                    credentials: "include"
                });

                if(!response.ok) {
                    throw new Error("Network response is not okay")
                }
                const data = await response.json();
                setMechanic(data);

            } catch(error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        loadProfile();

    }, []);

    return (
        <AuthContext.Provider
            value={{
                mechanic,
                setMechanic,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
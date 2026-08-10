import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
import { useNavigate } from "react-router-dom";

export function AuthContextProvider({ children }) {
    const navigate = useNavigate();
    const [mechanic, setMechanic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProfile = async () => {
            const token = localStorage.getItem("token");

            if(!token) {
                console.log("No token");
                setLoading(false);
                navigate("/");
                return;
            }

            try{
                const response = await fetch("http://localhost:3000/api/v1/mechanics/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
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
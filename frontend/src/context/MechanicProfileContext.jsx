import { createContext, useState } from "react";

export const MechanicProfileContext = createContext();

export function MechanicProfileProvider({ children }) {
    const [mechanicProfile, setMechanicProfile] = useState([]);

    return (
        <MechanicProfileContext.Provider
            value={{
                mechanicProfile,
                setMechanicProfile
            }}
        >
            {children}
        </MechanicProfileContext.Provider>
    );
}
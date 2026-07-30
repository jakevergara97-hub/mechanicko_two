import { createContext, useState } from "react";

export const MechanicsInfoContext = createContext();

export function MechanicsInfoProvider({ children }) {
    const [mechanics, setMechanics] = useState([]);
    const [error, setError] = useState("");

    return (
        <MechanicsInfoContext.Provider
            value={{
                mechanics,
                setMechanics,
                error,
                setError
            }}
        >
            {children}
        </MechanicsInfoContext.Provider>
    );
}
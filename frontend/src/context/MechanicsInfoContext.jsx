import { createContext, useState } from "react";

export const MechanicsInfoContext = createContext();

export function MechanicsInfoProvider({ children }) {
    const [mechanics, setMechanics] = useState([]);

    return (
        <MechanicsInfoContext.Provider
            value={{
                mechanics,
                setMechanics,
            }}
        >
            {children}
        </MechanicsInfoContext.Provider>
    );
}
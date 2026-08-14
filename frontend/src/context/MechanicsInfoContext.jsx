import { createContext, use, useState } from "react";

export const MechanicsInfoContext = createContext();

export function MechanicsInfoProvider({ children }) {
    const [mechanics, setMechanics] = useState([]);
    const [error, setError] = useState("");
    const [isClicked, setIsClicked] = useState(false);

    return (
        <MechanicsInfoContext.Provider
            value={{
                mechanics,
                setMechanics,
                error,
                setError,
                isClicked,
                setIsClicked
            }}
        >
            {children}
        </MechanicsInfoContext.Provider>
    );
}
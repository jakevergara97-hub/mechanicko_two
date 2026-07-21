import { createContext, useState } from "react";

export const CustomerLocationContext = createContext();

export function CustomerLocationProvider({ children }) {
    const [location, setLocation] = useState({
        region: "",
        province: "",
        city: "",
        barangay: "",
    });

    return (
        <CustomerLocationContext.Provider
            value={{
                location,
                setLocation,
            }}
        >
            {children}
        </CustomerLocationContext.Provider>
    );
}
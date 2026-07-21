import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { MechanicRegistrationPage } from "./pages/MechanicRegistrationPage";
import { CustomerLocationProvider } from "./context/CustomerLocationContext";
// import { MechanicsInfoContext } from "./context/MechanicsInfoContext";
import { MechanicsInfoProvider } from "./context/MechanicsInfoContext";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={
                    <CustomerLocationProvider>
                        <MechanicsInfoProvider>
                            <Home />
                        </MechanicsInfoProvider>
                    </CustomerLocationProvider>
                } />

                <Route
                    path="/mechanicsignup"
                    element={<MechanicRegistrationPage />}
                />
            </Routes>
        </>
    );
}

export default App;
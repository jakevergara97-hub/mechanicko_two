import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { MechanicRegistrationPage } from "./pages/MechanicRegistrationPage";
import { MechanicDashboard } from "./pages/MechanicDashboard";
import { CustomerLocationProvider } from "./context/CustomerLocationContext";
// import { MechanicsInfoContext } from "./context/MechanicsInfoContext";
import { MechanicsInfoProvider } from "./context/MechanicsInfoContext";
import { MechanicLogin } from "./pages/MechanicLogin";

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
                    path="/mechanicsignup" element={
                        <MechanicRegistrationPage />
                }/>

                <Route
                    path="/mechanicdashboard" element={
                        <MechanicDashboard />
                } />

                <Route
                    path="/mechaniclogin" element={
                        <MechanicLogin />
                } />
            </Routes>
        </>
    );
}

export default App;
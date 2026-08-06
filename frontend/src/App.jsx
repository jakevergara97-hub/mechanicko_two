import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { MechanicRegistrationPage } from "./pages/MechanicRegistrationPage";
import { MechanicDashboard } from "./pages/MechanicDashboard";
import { CustomerLocationProvider } from "./context/CustomerLocationContext";
// import { MechanicsInfoContext } from "./context/MechanicsInfoContext";
import { MechanicsInfoProvider } from "./context/MechanicsInfoContext";
import { MechanicProfileProvider } from "./context/MechanicProfileContext";
import { MechanicRegistrationForm } from "./components/mechanic_registration/MechanicRegistrationForm";

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
                        <MechanicProfileProvider>
                            <MechanicRegistrationPage />
                        </MechanicProfileProvider>
                }/>

                <Route
                    path="/mechanicdashboard" element={
                        <MechanicProfileProvider>
                            <MechanicDashboard />
                        </MechanicProfileProvider>
                } />
            </Routes>
        </>
    );
}

export default App;
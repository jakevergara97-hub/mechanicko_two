import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { MechanicRegistrationPage } from "./pages/MechanicRegistrationPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route
                path="/mechanicsignup"
                element={<MechanicRegistrationPage />}
            />
        </Routes>
    );
}

export default App;
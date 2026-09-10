import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { mechanicLogout } from "../../services/mechanicLogout";

export function Logout() {
    const navigate = useNavigate();
    const { setMechanic } = useContext(AuthContext)

    const handleLogout = async () => {
        const response = await mechanicLogout();

        if(response.success) {
            setMechanic(null);
            navigate("/");
        }
    }

    return (
        <>
            <button onClick={handleLogout}>
                Logout
            </button>
        </>
    );
}
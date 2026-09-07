import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { mechanicLogout } from "../../services/mechanicLogout";

export function Logout() {
    const navigate = useNavigate();
    const { setMechanic } = useContext(AuthContext)

    const handleLogout = async () => {
        // localStorage.removeItem("token");
        // setMechanic([]);
        // navigate("/");
        // window.location.href = "/";

        const response = await mechanicLogout();

        // const data = await response.json();
        // console.log(response);

        if(response.success) {
            setMechanic([]);
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
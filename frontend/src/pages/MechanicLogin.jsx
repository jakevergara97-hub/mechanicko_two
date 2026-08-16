import { useState, useContext } from "react";
import { loginMechanic } from "../services/loginMechanicService";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export function MechanicLogin() {
    const { mechanic, setMechanic } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const initialFormState = {
        email: '',
        password: ''
    }

    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        try{
            const data = await loginMechanic({email, password});

            if(data.success) {
                setMechanic(data);
                navigate("/mechanicdashboard");
            }
        }catch(error) {
            setError(error.message);
        }
    }

    return (
        <div>
            <h3>Mechanic Login Page</h3>
            <form onSubmit={handleSubmit}>
                <input
                    id="mechanic-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                />
            <br />

            <input
                    id="mechanic-password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                />
            <br />
            {error && <p>{error}</p>}
            <button>Login</button>
            </form>
            <Link to={"/"}>
                Home
            </Link>
        </div>
    );
}
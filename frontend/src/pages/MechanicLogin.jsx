import { useState, useContext } from "react";
import { loginMechanic } from "../services/loginMechanicService";

export function MechanicLogin() {

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
        console.log(email);
        console.log(password);
        try{
            const data = await loginMechanic({email, password});

            console.log(data); // This should print the token
        }catch(error) {
            console.error(error.message);
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
            <button>Login</button>
            </form>
        </div>
    );
}
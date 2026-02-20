import { useState } from "react";
import Input from "../components/input"
import { loginUser } from "../services/auth";
export default function Login(){
    const [form,setForm] = useState({
        email:"",
        password:""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await loginUser(form);
            localStorage.setItem('token',response.token);
            console.log(response.token);
        } catch (error) {
            console.log("Login Failed!");
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input label={"Email: "} placeholder={"Enter your email"} type="email" name={"email"} value={form.email} onChange={handleChange}/>
                <Input label={"Password: "} placeholder={"Enter your password"} type="password" name={"password"} value={form.password} onChange={handleChange}/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
import { useEffect, useState } from "react";
import Input from "../components/input";
import { loginUser } from "../services/auth";
import travelImg from "../assets/login/travel.avif";
import bgImage from "../assets/login/bg.png";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState({});
    const navigate = useNavigate();

    
    const validate = () => {
        let newError = {};

        if (!form.email) {
            newError.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newError.email = "Enter valid email";
        }

        if (!form.password) {
            newError.password = "Password is required";
        } else if (form.password.length < 6) {
            newError.password = "Minimum 6 characters required";
        }

        return newError;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));

        
        setError(prev => ({
            ...prev,
            [name]: "",
            general: ""
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validateError = validate();

        if (Object.keys(validateError).length > 0) {
            setError(validateError);
            return;
        }

        try {
            const response = await loginUser(form);
            localStorage.setItem("token", response.token);
            navigate("/trips");
        } catch (err) {
            setError({ general: "Invalid email or password" });
        }
    };

    
    useEffect(() => {
        let newError = {};

        if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
            newError.email = "Enter valid email";
        }

        if (form.password && form.password.length < 6) {
            newError.password = "Minimum 6 characters required";
        }

        
        setError(prev => ({
            ...prev,
            email: newError.email || "",
            password: newError.password || ""
        }));

    }, [form.email, form.password]);

    return (
        <div
            className="min-h-screen flex justify-center items-center bg-cover bg-center relative"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10 w-225 bg-white backdrop-blur-md rounded-2xl shadow-2xl flex overflow-hidden">

                {/* Image */}
                <div className="hidden md:flex w-1/2 items-center justify-center p-10">
                    <img
                        src={travelImg}
                        alt="Travel"
                        className="max-h-87.5 object-contain"
                    />
                </div>

                {/* Form */}
                <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-2 text-gray-800">
                        Welcome Back ✈️
                    </h2>

                    <p className="text-gray-500 mb-8">
                        Log in to continue your journey
                    </p>

                    {/* General Error */}
                    {error.general && (
                        <p className="text-red-500 text-sm text-center mb-4">
                            {error.general}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Email */}
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            error={error.email}
                        />

                        {/* Password */}
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            error={error.password}
                        />

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg bg-linear-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:scale-105 transition duration-300 shadow-md"
                        >
                            Login
                        </button>
                    </form>

                    {/* Register Link */}
                    <p className="mt-6 text-sm text-gray-600 text-center">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-indigo-600 font-medium hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
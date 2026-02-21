import { useState } from "react";
import Input from "../components/input"
import { Link } from "react-router-dom";
import { registerUser } from "../services/auth";
import travelImg from "../assets/login/travel.avif";
import bgImage from "../assets/login/bg.png"

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(form);
            console.log(response);
        } catch (error) {
            console.log("Login Failed!");
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-cover bg-center relative" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative z-10 w-225 bg-white backdrop-blur-md rounded-2xl shadow-2xl flex overflow-hidden ">
                <div className="hidden md:flex w-1/2 items-center justify-center  p-10">
                    <img
                        src={travelImg}
                        alt="Travel"
                        className="max-h-87.5 object-contain"
                    />
                </div>
                <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-2 text-gray-800">
                        Create Account ✈️
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Start your journey with Pathfolio
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Name"
                            placeholder="Enter your name"
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />

                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />

                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                        />

                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg bg-linear-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:scale-105 transition duration-300 shadow-md"
                        >
                            Register
                        </button>
                    </form>
                    <p className="mt-6 text-sm text-gray-600 text-center">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-indigo-600 font-medium hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
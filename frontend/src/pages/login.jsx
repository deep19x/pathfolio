import Input from "../components/input";
import { loginUser } from "../services/auth";
import travelImg from "../assets/login/travel.avif";
import bgImage from "../assets/login/bg.png";
import { Link, useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form'

export default function Login() {
    const {
        register,
        handleSubmit,
        formState:{errors},
        setError
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async(data) => {
        try {
            const response = await loginUser(data);
            localStorage.setItem('token',response.token);
            navigate('/trips');
        } catch (error) {
            setError("root",{
                message: "Invalid email or password"
            });
        }
    };

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
                    {errors.root?.message && (
                        <p className="text-red-500 text-sm text-center mb-4">
                            {errors.root.message}
                        </p>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* Email */}
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            error = {errors.email?.message}
                            {...register("email",{
                                required:"Email is required",
                                pattern : {
                                    value: /\S+@\S+\.\S+/,
                                    message:"Enter valid email"
                                }
                            })}
                        />

                        {/* Password */}
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            error={errors.password?.message}
                            {...register("password",{
                                required: "Password is required",
                                minLength : {
                                    value : 6,
                                    message: "Minimum 6 characters required"
                                }
                            })}
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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../../store/slices/authSlice.js";
import { useDispatch } from "react-redux";
import logo from "../../assets/image-removebg-preview.png";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({ email: "", motDePasse: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(loginUser(formData));
        if (loginUser.fulfilled.match(result)) {
            const user = result.payload.user;
            if (user?.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-50 via-green-50 to-lime-100 p-5 font-sans">
            <div className="relative w-full max-w-md bg-white rounded-3xl p-10 shadow-xl shadow-lime-200/50 border border-lime-100 overflow-hidden">
                <div className="absolute -top-5 -right-5 text-[100px] opacity-[0.08] rotate-[20deg] pointer-events-none select-none">
                    🌿
                </div>
                <div className="absolute -bottom-8 -left-8 text-[120px] opacity-[0.08] -rotate-[15deg] pointer-events-none select-none">
                    🫒
                </div>

                <div className="text-center mb-8">
                    <img
                        src={logo}
                        alt="OliveTrack"
                        className="w-20 h-20 object-contain rounded-full mx-auto mb-2"
                    />
                    <h1 className="text-3xl font-bold text-lime-800 mb-1 tracking-wide">
                        OliveTrack
                    </h1>
                    <p className="text-sm text-lime-600 font-medium m-0">
                        Welcome Back
                    </p>
                    <p className="text-[13px] text-gray-400 mt-1">
                        Sign in to continue your journey.
                    </p>
                </div>

                <form>
                    <div className="mb-4">
                        <label className="block text-[13px] font-semibold text-lime-800 mb-1.5">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full py-3 pr-3 pl-4 border-2 border-lime-50 rounded-xl text-sm bg-lime-50/40 text-lime-900 placeholder-gray-400 outline-none transition-all duration-300 focus:border-lime-400 focus:bg-white focus:ring-4 focus:ring-lime-300/20"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-[13px] font-semibold text-lime-800 mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                name="motDePasse"
                                value={formData.motDePasse}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full py-3 pr-3 pl-4 border-2 border-lime-50 rounded-xl text-sm bg-lime-50/40 text-lime-900 placeholder-gray-400 outline-none transition-all duration-300 focus:border-lime-400 focus:bg-white focus:ring-4 focus:ring-lime-300/20"
                            />
                        </div>
                    </div>

                    <div className="text-right mb-6">
                        <a
                            href="/forgot-password"
                            className="text-[13px] text-lime-600 font-semibold no-underline border-b-2 border-transparent transition-colors duration-300 hover:border-lime-400"
                        >
                            Forgot Password?
                        </a>
                    </div>

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full py-3.5 bg-gradient-to-br from-lime-400 to-lime-600 text-white border-none rounded-xl text-base font-semibold cursor-pointer tracking-wide shadow-lg shadow-lime-400/40 transition-all duration-300 hover:from-lime-500 hover:to-lime-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-lime-500/50"
                    >
                        {status === "loading" ? "Logging in..." : "🌱 Log In"}
                    </button>
                </form>

                <p className="text-center mt-4.5 text-sm text-gray-400">
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="text-lime-600 font-semibold no-underline border-b-2 border-lime-50 transition-colors duration-300 hover:border-lime-400"
                    >
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;

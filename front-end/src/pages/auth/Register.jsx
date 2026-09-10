import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../store/slices/authSlice";
import logo from "../../assets/image-removebg-preview.png";

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        nom: "",
        email: "",
        motDePasse: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(registerUser(formData));
        if (registerUser.fulfilled.match(result)) {
            navigate("/");
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-50 via-green-50 to-lime-100 p-4 font-sans">
            <div className="relative w-full max-w-sm bg-white rounded-3xl p-7 shadow-xl shadow-lime-200/50 border border-lime-100 overflow-hidden">
                <div className="absolute -top-5 -right-5 text-[100px] opacity-[0.08] rotate-[20deg] pointer-events-none select-none">
                    🌿
                </div>
                <div className="absolute -bottom-8 -left-8 text-[120px] opacity-[0.08] -rotate-[15deg] pointer-events-none select-none">
                    🫒
                </div>

                <div className="text-center mb-5">
                    <img
                        src={logo}
                        alt="OliveTrack"
                        className="w-20 h-20 object-contain rounded-full mx-auto mb-2"
                    />

                    <h1 className="text-2xl font-bold text-lime-800 mb-1 tracking-wide">
                        OliveTrack
                    </h1>

                    <p className="text-[13px] text-lime-600 font-medium m-0">
                        Create Account
                    </p>

                    <p className="text-[12px] text-gray-400 mt-1">
                        Join our community of OliveTrack.
                    </p>
                </div>

                <form>
                    <div className="mb-3">
                        <label className="block text-[12px] font-semibold text-lime-800 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full py-2.5 px-4 border-2 border-lime-50 rounded-xl text-sm bg-lime-50/40 text-lime-900 placeholder-gray-400 outline-none transition-all duration-300 focus:border-lime-400 focus:bg-white focus:ring-4 focus:ring-lime-300/20"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block text-[12px] font-semibold text-lime-800 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full py-2.5 px-4 border-2 border-lime-50 rounded-xl text-sm bg-lime-50/40 text-lime-900 placeholder-gray-400 outline-none transition-all duration-300 focus:border-lime-400 focus:bg-white focus:ring-4 focus:ring-lime-300/20"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block text-[12px] font-semibold text-lime-800 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="motDePasse"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full py-2.5 px-4 border-2 border-lime-50 rounded-xl text-sm bg-lime-50/40 text-lime-900 placeholder-gray-400 outline-none transition-all duration-300 focus:border-lime-400 focus:bg-white focus:ring-4 focus:ring-lime-300/20"
                        />
                    </div>
                    {/* 
                    <div className="mb-4">
                        <label className="block text-[12px] font-semibold text-lime-800 mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="motDePasse"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full py-2.5 px-4 border-2 border-lime-50 rounded-xl text-sm bg-lime-50/40 text-lime-900 placeholder-gray-400 outline-none transition-all duration-300 focus:border-lime-400 focus:bg-white focus:ring-4 focus:ring-lime-300/20"
                        />
                    </div> */}

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full py-3 bg-gradient-to-br from-lime-400 to-lime-600 text-white border-none rounded-xl text-[15px] font-semibold cursor-pointer tracking-wide shadow-lg shadow-lime-400/40 transition-all duration-300 hover:from-lime-500 hover:to-lime-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-lime-500/50"
                    >
                        {status === "loading"
                            ? "Processing..."
                            : " 🌱 Register"}
                    </button>
                </form>

                <p className="text-center mt-3.5 text-[13px] text-gray-400">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="text-lime-600 font-semibold no-underline border-b-2 border-lime-50 transition-colors duration-300 hover:border-lime-400"
                    >
                        Log In
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Register;

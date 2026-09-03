import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            await register(
                name,
                email,
                password
            );

            navigate("/",
                {
                    replace: true,
                }
            );

        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }

    }


    return (

        <div className="min-h-screen bg-[#090b0f] flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl p-6 shadow-xl">

                <h1 className="text-3xl font-bold text-orange-300 text-center">
                    Create Account
                </h1>

                <p className="text-gray-400 text-center mt-2">
                    Join QuickCuisine
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >

                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={
                            e => setName(e.target.value)
                        }
                        required
                        className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white outline-none focus:border-orange-300"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={
                            e => setEmail(e.target.value)
                        }
                        required
                        className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white outline-none focus:border-orange-300"
                    />

                    <input
                        type="password"
                        placeholder="Password (minimum 8 characters)"
                        value={password}
                        onChange={
                            e => setPassword(e.target.value)
                        }
                        required
                        minLength={8}
                        className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white outline-none focus:border-orange-300"
                    />

                    {
                        error && (
                            <p className="text-red-400 text-sm text-center">
                                {error}
                            </p>
                        )
                    }

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-400 hover:bg-orange-500 disabled:opacity-50 text-black font-semibold rounded-lg py-3 transition"
                    >
                        {loading
                            ? "Creating..."
                            : "Create Account"
                        }
                    </button>

                </form>

                <p className="text-gray-400 text-center mt-6 text-sm">

                    Already have an account?

                    {" "}

                    <Link
                        to="/login"
                        className="text-orange-300 hover:text-orange-200"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

};

export default Register;
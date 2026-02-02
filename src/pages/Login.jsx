import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center 
                        bg-gradient-to-br from-slate-700 via-gray-800 to-slate-600">

            
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl px-10 py-12">

                
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
                    Login
                </h2>
                <p className="text-sm text-gray-500 text-center mb-8">
                    Please login to access your account
                </p>

            
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Email
                    </label>
                    <input
                        className="w-full px-4 py-3 rounded-lg bg-gray-100 
                                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                    />
                </div>

                
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        className="w-full px-4 py-3 rounded-lg bg-gray-100 
                                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                    />
                </div>

                
                <button
                    onClick={() => navigate("/Template")}
                    className="w-full py-3 rounded-lg font-semibold text-white
                               bg-gradient-to-r from-slate-700 to-indigo-600
                               hover:from-blue-400 hover:to-indigo-700
                               transition duration-300 shadow-md"
                >
                    Login
                </button>

                
            </div>
        </div>
    );
}

import React, { useState } from "react";
import { FaUser, FaLock, FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center p-4 font-['Plus_Jakarta_Sans'] overflow-hidden"
         style={{ background: "radial-gradient(circle at 80% 20%, #2f6d55ff 0%, #2a5252ff 40%, #182353ff 100%)" }}>
      
      {/* Container - Radius updated to 20px (rounded-2xl) */}
      <div className="bg-[#1a2223] rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] p-10 w-full max-w-md border border-white/10 backdrop-blur-md">
        
        <div className="text-center mb-8">
          <div className="inline-block bg-[#1a2223] px-6 py-2 rounded-xl mb-4 border border-[#22c55e]/30">
            <h2 className="text-2xl font-black text-white tracking-tighter">
              <span className="text-[#22c55e]">INV</span>ENTORY
            </h2>
          </div>
          <p className="text-gray-300 text-base font-medium">Please enter your details to login</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
            <div className="group flex items-center bg-[#252d2e] rounded-xl px-4 py-2.5 border border-white/5 focus-within:border-[#22c55e]/50 transition-all">
              <FaUser className="text-gray-500 text-sm" />
              <input type="email" required placeholder="name@company.com" className="w-full bg-transparent focus:outline-none text-white placeholder-gray-600 ml-3 text-base" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Password</label>
            <div className="group flex items-center bg-[#252d2e] rounded-xl px-4 py-2.5 border border-white/5 focus-within:border-[#22c55e]/50 transition-all">
              <FaLock className="text-gray-500 text-sm" />
              <input type={showPassword ? "text" : "password"} required placeholder="••••••••" className="w-full bg-transparent focus:outline-none text-white placeholder-gray-600 ml-3 text-base" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500 hover:text-[#22c55e]">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-[#22c55e] hover:bg-[#1eb054] text-[#0f111a] py-3.5 rounded-xl font-black text-base transition-all shadow-lg flex items-center justify-center gap-2 mt-4">
            {loading ? "Verifying..." : "Login to Dashboard"} <FaArrowRight />
          </button>
        </form>

        <p className="text-center text-gray-400 mt-8 text-base">
          New here? <button onClick={() => navigate("/signup")} className="text-[#22c55e] font-bold hover:underline ml-1">Create Account</button>
        </p>
      </div>
    </div>
  );
}
export default Login;
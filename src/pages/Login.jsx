import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/ClientAPI";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("Kalai");
  const [password, setPassword] = useState("Kalai@143");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const data = await loginUser(username, password);
      // const data = {success: 'Login Success', redirect_url: '/dashboard/'}; // Mock login for demonstration
      login({ ...data, username });
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-300 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            <span className="text-lg font-semibold">
              AIRDIT AMS
              <span className="pl-2 text-sm">(powered by airbot)</span>
            </span>{" "}
            is an intelligent chatbot designed to provide quick, accurate, and
            helpful responses to user queries. It streamlines support by
            automating conversations, improving efficiency and user experience.
          </p>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body">
            {/* Username */}
            <label className="input validator">
              <input
                type="text"
                required
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
            </label>

            {/* Password */}
            <label className="input validator">
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </label>

            <div className="flex justify-between">
              <Link to="/login" className="link link-hover">
                Need Help!
              </Link>
              <Link to="/login" className="link link-hover">
                Forgot password?
              </Link>
            </div>

            {/* Button with Loader */}
            <button
              className="btn btn-neutral mt-2 w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-infinity loading-md"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

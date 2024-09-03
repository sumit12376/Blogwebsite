import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const login = async (data) => {
    setError("");
    setLoading(true); // Set loading to true before starting the login process
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false after the login process is complete
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
     <div className="hidden md:block">
  <img src="/loginsvg.png" alt="Your Alt Text" />
</div>

      <div
        className={`my-10 mx-20 w-full max-w-lg rounded-xl p-10 border bg-indigo-950 border-black/10 justify-between gap-10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]"></span>
        </div>
        <h1 className="text-center text-2xl font-bold leading-tight text-white">
          Sign in to your account
        </h1>
        <p className="mt-2 text-center text-base text-white/60">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-blue-500 transition-all duration-200 hover:text-white hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        {loading && (
  <p className="text-white text-center text-xl font-semibold  p-2 rounded-md shadow-md">
    Loading...
  </p>
)}
{/* Display loading text */}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'} {/* Display loading text on button */}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

import { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const create = async (data) => {
    setError(""); // Clear any previous errors
    setLoading(true);
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) dispatch(login(currentUser));
        navigate("/");
      }
    } catch (error) {
      setError(error.message); // Set the error message if something goes wrong
    } finally {
      setLoading(false); // Ensure loading is set to false after the process
    }
  };

  return (
    <div className="flex items-center justify-center">
       <div className="hidden md:block">
  <img src="/paaji.png" alt="Your Alt Text" />
</div>
      <div className="mx-auto w-full max-w-lg bg-indigo-950 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]"></span>
        </div>
        <h1 className="text-center text-2xl font-bold leading-tight text-white">
          Sign up to create an account
        </h1>
        <p className="mb-7 mt-2 text-center text-base text-white/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-blue-500 transition-all duration-200 hover:text-white hover:underline"
          >
            Sign In
          </Link>
        </p>
        {loading && (
          <p className="text-white text-center text-xl font-semibold p-2 rounded-md shadow-md">
            Loading...
          </p>
        )}
        {error && (
          <p className="text-red-600 mt-8 text-center">
            {error} {/* Display the error message if it exists */}
          </p>
        )}
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: "Full name is required",
              })}
            />
            <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

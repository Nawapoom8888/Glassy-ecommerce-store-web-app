import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signup, { isLoading }] = useSignupMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    } else {
      try {
        const response = await signup({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...response }));
        navigate(redirect);
        toast.success("Signed up successfully!");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="mx-2 grid w-[28rem] grid-cols-1 min-[300px]:mx-4">
      <form
        onSubmit={submitHandler}
        className="flex w-full flex-col rounded-2xl bg-gray-200 px-5 py-16 min-[300px]:px-10 min-[450px]:px-16"
      >
        <h1 className="mb-6 text-center text-xl font-semibold">Sign Up</h1>

        <div className="mb-4 flex flex-col">
          <label htmlFor="username" className="mb-1 font-medium">
            Name
          </label>
          <input
            type="text"
            className="rounded-lg px-3 py-2 outline-none"
            placeholder="Enter your name"
            id="username"
            name="username"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4 flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            className="rounded-lg px-3 py-2 outline-none"
            placeholder="Enter your email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4 flex flex-col">
          <label htmlFor="password" className="mb-1 font-medium">
            Password
          </label>
          <input
            type="password"
            className="rounded-lg px-3 py-2 outline-none"
            placeholder="Enter your password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-12 flex flex-col">
          <label htmlFor="confirmPassword" className="mb-1 font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            className="rounded-lg px-3 py-2 outline-none"
            placeholder="Confirm your password"
            id="confirmPassword"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          className="mb-6 rounded-lg bg-neutral-800 py-3 font-medium text-gray-100 transition-colors duration-200 hover:bg-neutral-700"
          type="submit"
          disabled={isLoading}
          onClick={() => window.scrollTo(0, 0)}
        >
          SIGNUP
        </button>

        <div className="text-center">
          Already have an account ?{" "}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            className="inline-block underline"
            onClick={() => window.scrollTo(0, 0)}
          >
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { signIn } from "next-auth/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === "" || email === "") {
      toast.error("Fill all fields!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error == null) {
        router.push("/");
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-[5rem]   flex justify-center items-center">
      <div className="shadow-xl h-[50vh] w-72 shadow-lime-500">
        <h2 className=" text-center m-5 text-[32px] text-black ">Log In</h2>
        <form
          className="mt-2 flex p-2 border-1-solid rounded-[6px]  flex-col justify-center align-middle"
          onSubmit={handleSubmit}
        >
          <input className="w-full border my-1  border-gray-300 rounded-md py-2 px-2 focus:outline-none focus:border-blue-500"
            type="email"
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
          className="w-full border border-gray-300 rounded-md py-2 px-2 focus:outline-none focus:border-blue-500 my-1"
            type="password"
            placeholder="Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full text-lime-600 font-lime-600 rounded-md py-2 px-4 hover:bg-lime-600 hover:text-white">Log in</button>
          <Link href="/register">
            Don't have an account? <br /> Register now.
          </Link>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

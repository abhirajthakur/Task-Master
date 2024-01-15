"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const BACKEND_ROUTE = process.env.BACKEND_ROUTE;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${BACKEND_ROUTE}/user/signup`, {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (data) {
        alert(data.message);
      }
    } catch (err) {
      if (err.response) {
        if (message.includes("already exists")) {
          alert("User with this email already exists. Please login");
        } else if (message.includes("Invalid email or password")) {
          alert(
            "Make sure the email you have entered is an valid email and the password is atleast 8 characters long",
          );
        } else {
          alert(message);
        }
      } else if (err.request) {
        alert(err.request.responseText);
      } else {
        console.log(err);
      }

      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center overflow-hidden ">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Sign Up</h1>
              <p className="mt-2 text-sm text-gray-500">Create your account</p>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">Name</label>
                  <input
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Name"
                    name="name"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Email</label>
                  <input
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Password</label>
                  <input
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="pt-4 border-none flex items-center space-x-4">
                <button
                  className="flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
                  onClick={(e) => handleSubmit(e)}
                >
                  Sign Up
                </button>
                <button
                  className="flex justify-center items-center w-full text-blue-500 px-4 py-3 rounded-md focus:outline-none border border-blue-500 hover:bg-blue-100 hover:shadow-lg"
                  onClick={() => router.push("/signin")}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

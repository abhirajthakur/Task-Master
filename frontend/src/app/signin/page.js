"use client";

import { userAtom } from "@/store/atoms/user";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

export default function Home() {
  const router = useRouter();
  const setUser = useSetRecoilState(userAtom);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`http://localhost:8080/user/signin`, {
        email: form.email,
        password: form.password,
      });

      setUser({
        name: data.user.name,
        userId: data.user._id,
        xp: data.user.xp,
        isAuthenticated: true,
      });

      window.localStorage.setItem("token", data.token);
      router.push("/");
    } catch (err) {
      if (err.response) {
        const message = err.response.data.message;
        alert(message);
        console.log(message);
      }
      console.log("ERROR", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Log In</h1>
              <p className="mt-2 text-sm text-gray-500">Access your account</p>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
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
                  className="flex justify-center items-center w-full text-blue-500 px-4 py-3 rounded-md focus:outline-none border border-blue-500 hover:bg-blue-100 hover:shadow-lg"
                  onClick={() => router.push("/signup")}
                >
                  Sign Up
                </button>
                <button
                  className="flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
                  onClick={(e) => handleSubmit(e)}
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

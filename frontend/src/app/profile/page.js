"use client";

import { userAtom } from "@/store/atoms/user";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function Home() {
  const user = useRecoilValue(userAtom);
  const [completedTasks, setCompletedTasks] = useState([]);
  const BACKEND_ROUTE = process.env.BACKEND_ROUTE;

  useEffect(() => {
    async function fetchTasks() {
      const { data } = await axios.get(
        `${BACKEND_ROUTE}/user/${user.userId}/completedTasks`,
        {
          headers: {
            Authorization: window.localStorage.getItem("token"),
          },
        },
      );

      setCompletedTasks(data.tasks);
    }
    fetchTasks();
  }, [user, BACKEND_ROUTE]);

  return (
    <main>
      <ProfileHeader />
      <section className="px-4 py-3">
        <h2 className="text-2xl font-bold mb-4">Completed Tasks</h2>
        <div className="grid gap-4">
          {completedTasks.map((task, id) => (
            <div
              key={id}
              className="border rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold">{task.name}</h3>
                <p className="text-sm text-gray-500">{task.description}</p>
              </div>
              <div className="flex items-center gap-5 justify-between">
                <p>
                  {task.xpValue}{" "}
                  <span className="text-sm text-gray-400">XP</span>
                </p>
                <CheckIcon className="h-6 w-6 text-green-500" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function ProfileHeader() {
  const user = useRecoilValue(userAtom);

  return (
    <div>
      <header className="flex p-6 h-[75px] items-center gap-5 border-b bg-white shadow-md">
        <Link
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
          href="/features"
        >
          <span className="text-xl">Home</span>
        </Link>
        <div className="flex-1">
          <h1 className="font-semibold text-xl">Profile</h1>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-between border px-4 py-2 border-black rounded-md">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">{user.name}</h1>
          </div>

          <div className="flex flex-col items-center">
            <span>XP Balance</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{user.xp}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                XP
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

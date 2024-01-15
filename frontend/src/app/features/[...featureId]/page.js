"use client";

import { TaskCard } from "@/components/TaskCard";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const [tasks, setTasks] = useState([]);
  const BACKEND_ROUTE = process.env.BACKEND_ROUTE;
  const fetchTasks = async () => {
    try {
      const { featureId } = params;
      const { data } = await axios.get(
        `${BACKEND_ROUTE}/features/${featureId}/tasks`,
      );

      setTasks(data.tasks);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.error);
      } else if (err.request.error) {
        console.log(err.request.responseText);
      } else {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="flex items-center justify-between p-6 bg-white shadow-md">
        <Link className="text-gray-900" href="/features">
          <ArrowLeftIcon className="h-8 w-8" />
          <span className="sr-only">Go back</span>
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
        <div className="w-6" />
      </header>
      <main className="p-6 grid gap-6 lg:grid-cols-3">
        {tasks.map((task, id) => (
          <TaskCard
            key={id}
            name={task.name}
            taskId={task._id}
            description={task.description}
            xp={100}
          />
        ))}
      </main>
    </div>
  );
}

function ArrowLeftIcon(props) {
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
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

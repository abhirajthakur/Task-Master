import { userAtom } from "@/store/atoms/user";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

export function TaskCard({ name, description, taskId, xp }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const setUser = useSetRecoilState(userAtom);
  const BACKEND_ROUTE = process.env.BACKEND_ROUTE;

  const fetchCompletedStatus = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_ROUTE}/tasks/${taskId}/completed`,
        {
          headers: {
            Authorization: window.localStorage.getItem("token"),
          },
        },
      );

      setIsCompleted(data.completed);
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

  const handleComplete = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      `${BACKEND_ROUTE}/tasks/${taskId}/complete`,
      {},
      {
        headers: {
          Authorization: window.localStorage.getItem("token"),
        },
      },
    );

    if (data.user) {
      setIsCompleted(true);
      setUser((prev) => ({
        ...prev,
        xp: data.user.xp,
      }));
    }
  };

  useEffect(() => {
    fetchCompletedStatus();
  }, [isCompleted]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          {name}
        </h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="p-14 pt-0 flex items-center justify-around">
        {isCompleted ? (
          <div className="w-full p-2 rounded-s-full rounded-e-full bg-green-400 text-white flex items-center justify-center">
            <CheckIcon className="w-6 h-6" />
            <span className="ml-2 font-medium">Completed</span>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4">
            <span className="text-xl font-bold whitespace-nowrap	">{xp} XP</span>
            <button
              className="rounded-full bg-red-400 text-gray-50 px-2 hover:bg-red-500/90 items-center justify-center h-10 w-full"
              onClick={(e) => handleComplete(e)}
            >
              Mark as Completed
            </button>
          </div>
        )}
      </div>
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

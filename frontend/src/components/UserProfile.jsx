"use client";

import Link from "next/link";

export function UserProfile() {
  return (
    <main className="p-4 md:p-6 lg:p-8">
      <ProfileHeader />
      <section className="px-4 py-3">
        <h2 className="text-2xl font-bold mb-4">Completed Tasks</h2>
        <div className="grid gap-4">
          <div className="border rounded-lg p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Task 1</h3>
              <p className="text-sm text-gray-500">
                Completed on 10th Jan 2024
              </p>
            </div>
            <CheckIcon className="h-6 w-6 text-green-500" />
          </div>

          <div className="border rounded-lg p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Task 2</h3>
              <p className="text-sm text-gray-500">
                Completed on 11th Jan 2024
              </p>
            </div>
            <CheckIcon className="h-6 w-6 text-green-500" />
          </div>
          <div className="border rounded-lg p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Task 3</h3>
              <p className="text-sm text-gray-500">
                Completed on 12th Jan 2024
              </p>
            </div>
            <CheckIcon className="h-6 w-6 text-green-500" />
          </div>
        </div>
      </section>
    </main>
  );
}

function ProfileHeader() {
  return (
    <div>
      <header className="flex h-[60px] items-center gap-5 border-b bg-gray-100/40 px-6">
        <Link
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
          href="/home"
        >
          <span className="">Home</span>
        </Link>
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Profile</h1>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-between border px-4 py-2 border-black rounded-md">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">{}</h1>
          </div>

          <div className="flex flex-col items-center">
              <span>XP Balance</span>
              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold">{}</span>
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

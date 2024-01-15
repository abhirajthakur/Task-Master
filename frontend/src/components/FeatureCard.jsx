"use client";

import { useRouter } from "next/navigation";

export function FeatureCard({ task, description, xp, featureId }) {
  const router = useRouter();

  return (
    <div className="rounded overflow-hidden shadow-lg p-4 bg-white text-black">
      <h2 className="font-bold text-xl mb-2">{task}</h2>
      <p className="text-gray-700 dark:text-gray-400 text-base">
        {description}
      </p>
      <div className="mt-3">
        <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2 mb-2">
          +{xp} XP
        </span>
      </div>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => router.push(`/features/${featureId}`)}
      >
        View Tasks
      </button>
    </div>
  );
}

"use client";

import { FeatureCard } from "@/components/FeatureCard";
import { featureAtom } from "@/store/atoms/features";
import { userAtom } from "@/store/atoms/user";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function Home() {
  const setUser = useSetRecoilState(userAtom);
  const [features, setFeatures] = useRecoilState(featureAtom);
  const router = useRouter();

  const fetchFeatures = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/features");
      setFeatures(data.features);
    } catch (err) {
      console.error("Error fetching features:", err);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  return (
    <main className="flex flex-col w-full justify-between">
      <div className="flex flex-col min-h-screen bg-gray-100">
        <header className="flex items-center justify-between p-6 bg-white shadow-md">
          <h1 className="text-2xl font-semibold text-gray-900">Task Master</h1>
          <div className="flex px-4 gap-12">
            <Link
              className="text-gray-600 font-medium hover:text-gray-900"
              href="/profile"
            >
              Profile
            </Link>

            <Link
              className="text-gray-600 font-medium hover:text-gray-900"
              href="/signin"
              onClick={() => {
                try {
                  router.replace("/signin");
                  window.localStorage.removeItem("token");
                  setUser({
                    isAuthenticated: false,
                  });
                } catch (err) {
                  window.localStorage.setItem("error", err);
                  alert(err);
                  console.log(err);
                }
              }}
            >
              Logout
            </Link>
          </div>
        </header>

        <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {features.map((feature, id) => (
            <FeatureCard
              key={id}
              task={feature.name}
              description={feature.description}
              xp={feature.xpValue}
              featureId={feature._id}
            />
          ))}
        </section>
      </div>
    </main>
  );
}

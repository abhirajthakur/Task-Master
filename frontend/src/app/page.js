"use client";
import { userAtom } from "@/store/atoms/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

export default function Home() {
  const user = useRecoilValue(userAtom);
  const router = useRouter();

  useEffect(() => {
    if (!user.isAuthenticated) {
      router.push("/signup");
    } else {
      router.replace("/features");
    }
  }, [user.isAuthenticated, router]);

  return (
    <main className="flex flex-col w-full justify-between">
    </main>
  );
}

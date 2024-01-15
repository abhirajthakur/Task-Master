"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { RecoilRoot } from "recoil";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <RecoilRoot>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </RecoilRoot>
  );
}

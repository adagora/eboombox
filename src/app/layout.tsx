"use client";

import "react-toastify/dist/ReactToastify.css";
import React from "react";
import styles from "./page.module.css";

import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "../providers/ReactQueryClientProvider";
import NavBar from "../ui/Navbar";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={inter.className}>
          <NavBar />
          <main className={styles.main}>
            {children}
            <ToastContainer
              toastStyle={{
                backgroundColor: "black",
                color: "white"
              }}
              position="top-left"
            />
          </main>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}

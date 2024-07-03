import "react-toastify/dist/ReactToastify.css";
import React from "react";
import styles from "./page.module.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "../providers/ReactQueryClientProvider";
import NavBar from "../ui/Navbar";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "eboombox",
  description: "Generated music from latest block",
  keywords: ["Cardano"],
  metadataBase: new URL("https://localhost:3000"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US"
    }
  },
  openGraph: {
    title: "eboombox",
    description: "Generated music from latest block",
    url: "https://localhost:3000",
    siteName: "TaxiSwap",
    images: [
      {
        url: "",
        width: 1200,
        height: 627
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "",
    description: "Generated music from latest block",
    images: [""]
  }
};

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

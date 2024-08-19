import type { Metadata } from "next";

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
    siteName: "eboombox",
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

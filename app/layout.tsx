// app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GenieAsk - AI Text Generation Platform",
  description:
    "GenieAsk is an AI-powered text generation platform featuring multiple AI models, real-time generation, and smart content management.",
  icons: {
    icon: "/logo.jpg", // Replace with the path to your icon image file
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const suppressHydrationWarning = true;
  return (
    <html lang="en" suppressHydrationWarning={suppressHydrationWarning}>
      <head>
        <meta name="theme-color" content="#7C3AED" />
      </head>
      <body
        className={inter.className}
        suppressHydrationWarning={suppressHydrationWarning}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

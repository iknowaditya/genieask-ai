"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/auth/AuthForm";
import { useSession } from "next-auth/react";

export default function Auth() {
  const router = useRouter();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800/30 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to GenieAsk
          </h1>
          <p className="text-gray-400">Sign in to continue</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}

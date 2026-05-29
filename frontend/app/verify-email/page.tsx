"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const normalizeApiBase = () => {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:5000";
  const base = raw.replace(/\/+$/, "");
  return base.endsWith("/api") ? base : `${base}/api`;
};

const VerifyEmailPage: React.FC = () => {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    const token = params?.get("token");
    if (!token) {
      setStatus("error");
      setMessage("Verification token missing.");
      return;
    }

    (async () => {
      setStatus("loading");
      try {
        const apiBase = normalizeApiBase();
        const res = await fetch(`${apiBase}/auth/verify-email?token=${encodeURIComponent(token)}`);
        const data = await res.json();
        if (res.ok && data.success) {
          setStatus("success");
          setMessage(data.message || "Email verified successfully.");
        } else {
          setStatus("error");
          setMessage(data.message || "Verification failed.");
        }
      } catch (err) {
        setStatus("error");
        setMessage("Network error while verifying email.");
      }
    })();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
        {status === "loading" && <p className="text-gray-600">Verifying your email, please wait...</p>}
        {status === "success" && (
          <>
            <p className="text-green-600 mb-6">{message}</p>
            <button onClick={() => router.push("/signin")} className="px-6 py-2 bg-[#6366F1] text-white rounded-xl">Go to Sign in</button>
          </>
        )}
        {status === "error" && (
          <>
            <p className="text-red-600 mb-6">{message}</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => router.push("/signup")} className="px-6 py-2 bg-gray-100 rounded-xl">Try Signing Up</button>
              <button onClick={() => router.push("/signin")} className="px-6 py-2 bg-[#6366F1] text-white rounded-xl">Sign In</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;

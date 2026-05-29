"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authApi } from "@/lib/api";

interface UserData {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await authApi.me();
        if (response.success && response.data) {
          setUser(response.data);
        }
      } catch {
        // Not logged in
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please sign in to view your dashboard</p>
          <Link href="/signin" className="text-violet-600 hover:text-violet-700 font-medium">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ") || "User";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{fullName}</span>
            <span className="px-2 py-1 bg-violet-100 text-violet-700 text-xs rounded-full font-medium">
              {user.role}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid gap-6">
          {user.role === "admin" && (
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Admin Panel</h2>
              <Link
                href="/admin/users"
                className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
              >
                Manage Users
              </Link>
            </div>
          )}

          {user.role === "organizer" && (
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Organizer Tools</h2>
              <Link
                href="/organizer/profile"
                className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
              >
                My Profile
              </Link>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Account</h2>
            <div className="space-y-2 text-sm">
              <p><span className="text-gray-500">Email:</span> {user.email}</p>
              <p><span className="text-gray-500">Name:</span> {fullName}</p>
              <p><span className="text-gray-500">Role:</span> {user.role}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authApi, adminApi, AdminUser } from "@/lib/api";

const roleColors: Record<string, string> = {
  admin: "bg-red-100 text-red-700",
  organizer: "bg-violet-100 text-violet-700",
  attendee: "bg-gray-100 text-gray-700",
};

const roleOptions = ["attendee", "organizer", "admin"];

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState("");

  const loadUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await adminApi.getUsers(page, 10, search || undefined);
      if (response.success && response.data) {
        setUsers(response.data.users);
        setTotalPages(response.data.pagination.totalPages);
      } else {
        setError(response.message || "Failed to load users");
      }
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  const checkAdmin = async () => {
    try {
      const response = await authApi.me();
      if (!response.success || !response.data || response.data.role !== "admin") {
        router.push("/dashboard");
      }
    } catch {
      router.push("/signin");
    }
  };

  useEffect(() => {
    checkAdmin();
  }, []);

  useEffect(() => {
    loadUsers();
  }, [page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadUsers();
  };

  const handleRoleUpdate = async (userId: string) => {
    if (!selectedRole) return;
    try {
      const response = await adminApi.updateUserRole(userId, selectedRole);
      if (response.success) {
        setUsers(users.map((u) => (u.id === userId ? { ...u, role: selectedRole } : u)));
        setEditingUser(null);
        setSelectedRole("");
      } else {
        alert(response.message || "Failed to update role");
      }
    } catch {
      alert("Failed to update role");
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const response = await adminApi.deleteUser(userId);
      if (response.success) {
        setUsers(users.filter((u) => u.id !== userId));
      } else {
        alert(response.message || "Failed to delete user");
      }
    } catch {
      alert("Failed to delete user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
              ← Back
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <div className="flex gap-4">
            <Link
              href="/admin/users"
              className="text-violet-600 font-medium"
            >
              Users
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
          </div>

          <form onSubmit={handleSearch} className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Search by email or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700"
            >
              Search
            </button>
          </form>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}

          {isLoading ? (
            <p className="text-center text-gray-500 py-8">Loading users...</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">User</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Role</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Verified</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Joined</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-gray-500">
                          No users found
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="font-medium text-gray-900">
                              {user.first_name} {user.last_name || "N/A"}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{user.email}</td>
                          <td className="py-3 px-4">
                            {editingUser === user.id ? (
                              <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="px-2 py-1 border rounded text-sm"
                              >
                                {roleOptions.map((r) => (
                                  <option key={r} value={r}>
                                    {r}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  roleColors[user.role] || roleColors.attendee
                                }`}
                              >
                                {user.role}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`text-xs ${user.is_verified ? "text-green-600" : "text-gray-400"}`}
                            >
                              {user.is_verified ? "Verified" : "Pending"}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-500 text-sm">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex gap-2 justify-end">
                              {editingUser === user.id ? (
                                <>
                                  <button
                                    onClick={() => handleRoleUpdate(user.id)}
                                    className="px-2 py-1 text-xs bg-violet-600 text-white rounded hover:bg-violet-700"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => {
                                      setEditingUser(null);
                                      setSelectedRole("");
                                    }}
                                    className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700"
                                  >
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => {
                                      setEditingUser(user.id);
                                      setSelectedRole(user.role);
                                    }}
                                    className="px-2 py-1 text-xs text-violet-600 hover:text-violet-700"
                                  >
                                    Edit Role
                                  </button>
                                  <button
                                    onClick={() => handleDelete(user.id)}
                                    className="px-2 py-1 text-xs text-red-600 hover:text-red-700"
                                  >
                                    Delete
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1 text-sm text-gray-600">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
const API_BASE_URL = (() => {
  const rawUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
  const baseUrl = rawUrl && rawUrl !== "" ? rawUrl.replace(/\/+$/, "") : "http://localhost:5000";
  const normalizedBaseUrl = baseUrl.endsWith("/api") ? baseUrl : `${baseUrl}/api`;

  if (rawUrl && !rawUrl.endsWith("/api")) {
    if (typeof window !== "undefined") {
      console.warn(
        `NEXT_PUBLIC_API_URL is configured as '${rawUrl}', but the frontend expects the API to be mounted under '/api'. Using '${normalizedBaseUrl}' instead.`
      );
    }
  }

  return normalizedBaseUrl;
})();

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
}

interface MyEventApiItem {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  venue_name: string | null;
  status: string;
  banner_image_url: string | null;
  _count?: {
    bookings: number;
  };
}

export const apiClient = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers,
    },
    credentials: "include",
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please try again.",
    };
  }
};

export const authApi = {
  register: async (userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role?: "attendee" | "organizer";
  }) => {
    return apiClient("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials: { email: string; password: string }) => {
    return apiClient("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  logout: async () => {
    return apiClient("/auth/logout", {
      method: "POST",
    });
  },

  forgotPassword: async (email: string) => {
    return apiClient("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  resetPassword: async (token: string, password: string) => {
    return apiClient("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    });
  },

  me: async () => {
    return apiClient<{
      id: string;
      email: string;
      first_name: string | null;
      last_name: string | null;
      phone: string | null;
      profile_photo_url: string | null;
      bio: string | null;
      role: string;
      is_verified: boolean;
      created_at: string;
      updated_at: string;
    }>("/auth/me", {
      method: "GET",
    });
  },
};

export const eventApi = {
  getMyEvents: async () => {
    return apiClient<MyEventApiItem[]>("/events/my-events", {
      method: "GET",
    });
  },
};

export interface AdminUser {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  role: string;
  is_verified: boolean;
  created_at: string;
}

interface PaginatedUsers {
  users: AdminUser[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const adminApi = {
  getUsers: async (page = 1, limit = 10, search?: string) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("limit", limit.toString());
    if (search) params.set("search", search);
    return apiClient<PaginatedUsers>(`/admin/users?${params.toString()}`, {
      method: "GET",
    });
  },

  getUser: async (id: string) => {
    return apiClient<AdminUser>(`/admin/users/${id}`, {
      method: "GET",
    });
  },

  updateUserRole: async (id: string, role: string) => {
    return apiClient<AdminUser>(`/admin/users/${id}/role`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    });
  },

  verifyUser: async (id: string) => {
    return apiClient<AdminUser>(`/admin/users/${id}/verify`, {
      method: "PATCH",
    });
  },

  deleteUser: async (id: string) => {
    return apiClient(`/admin/users/${id}`, {
      method: "DELETE",
    });
  },
};

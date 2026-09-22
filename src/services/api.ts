import {
  UserRecord,
  GalleryImage,
  VideoRecord,
  DimensionRecord,
  CalculatorSettings,
  ServiceItem
} from '../types';

const TOKEN_KEY = 'arthco_admin_token';
const USER_KEY = 'arthco_admin_user';

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredAuth(token: string, user: UserRecord): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearStoredAuth(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getStoredUser(): UserRecord | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(endpoint, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errorMsg = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data && data.error) errorMsg = data.error;
    } catch {
      // no JSON body
    }
    throw new Error(errorMsg);
  }

  return res.json();
}

export const api = {
  // Auth
  async login(username: string, password: string): Promise<{ token: string; user: UserRecord; message: string }> {
    return request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },

  async getMe(): Promise<{ user: UserRecord }> {
    return request('/api/auth/me');
  },

  async updateProfile(profileData: Partial<UserRecord> & { currentPassword?: string; newPassword?: string }): Promise<{ success: boolean; user: UserRecord; message: string }> {
    return request('/api/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  // Users (IT Admin)
  async getUsers(): Promise<UserRecord[]> {
    return request('/api/users');
  },

  async createUser(data: Partial<UserRecord> & { password: string }): Promise<UserRecord> {
    return request('/api/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateUser(id: string, data: Partial<UserRecord> & { password?: string }): Promise<UserRecord> {
    return request(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteUser(id: string): Promise<{ success: boolean; message: string }> {
    return request(`/api/users/${id}`, {
      method: 'DELETE',
    });
  },

  // Images
  async getImages(): Promise<GalleryImage[]> {
    return request('/api/images');
  },

  async createImage(data: Partial<GalleryImage>): Promise<GalleryImage> {
    return request('/api/images', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateImage(id: string, data: Partial<GalleryImage>): Promise<GalleryImage> {
    return request(`/api/images/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteImage(id: string): Promise<{ success: boolean; message: string }> {
    return request(`/api/images/${id}`, {
      method: 'DELETE',
    });
  },

  // Videos
  async getVideos(): Promise<VideoRecord[]> {
    return request('/api/videos');
  },

  async createVideo(data: Partial<VideoRecord>): Promise<VideoRecord> {
    return request('/api/videos', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateVideo(id: string, data: Partial<VideoRecord>): Promise<VideoRecord> {
    return request(`/api/videos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteVideo(id: string): Promise<{ success: boolean; message: string }> {
    return request(`/api/videos/${id}`, {
      method: 'DELETE',
    });
  },

  // Dimensions
  async getDimensions(): Promise<DimensionRecord[]> {
    return request('/api/dimensions');
  },

  async createDimension(data: Partial<DimensionRecord>): Promise<DimensionRecord> {
    return request('/api/dimensions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateDimension(id: string, data: Partial<DimensionRecord>): Promise<DimensionRecord> {
    return request(`/api/dimensions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteDimension(id: string): Promise<{ success: boolean; message: string }> {
    return request(`/api/dimensions/${id}`, {
      method: 'DELETE',
    });
  },

  // Calculator
  async getCalculator(): Promise<CalculatorSettings> {
    return request('/api/calculator');
  },

  async updateCalculator(data: Partial<CalculatorSettings>): Promise<CalculatorSettings> {
    return request('/api/calculator', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Services
  async getServices(): Promise<ServiceItem[]> {
    return request('/api/services');
  },

  async createService(data: Partial<ServiceItem>): Promise<ServiceItem> {
    return request('/api/services', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateService(id: string, data: Partial<ServiceItem>): Promise<ServiceItem> {
    return request(`/api/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteService(id: string): Promise<{ success: boolean; message: string }> {
    return request(`/api/services/${id}`, {
      method: 'DELETE',
    });
  },

  // Stats
  async getStats(): Promise<Record<string, unknown>> {
    return request('/api/stats');
  },
};

import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      Cookies.remove('auth_token');
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Generic API response type
interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: any[];
  pagination?: {
    page?: number;
    limit?: number;
    total?: number;
    pages?: number;
    unreadCount?: number;
  };
}

// Auth API
export const authAPI = {
  login: async (credentials: { username: string; password: string }) => {
    const { data } = await api.post<ApiResponse>('/auth/login', credentials);
    return data;
  },

  getProfile: async () => {
    const { data } = await api.get<ApiResponse>('/auth/profile');
    return data;
  },

  logout: () => {
    Cookies.remove('auth_token');
  },
};

// Services API
export const servicesAPI = {
  getServices: async () => {
    const { data } = await api.get<ApiResponse>('/services');
    return data;
  },

  getAllServices: async () => {
    const { data } = await api.get<ApiResponse>('/services/admin');
    return data;
  },

  getService: async (id: string) => {
    const { data } = await api.get<ApiResponse>(`/services/${id}`);
    return data;
  },

  createService: async (serviceData: any) => {
    const { data } = await api.post<ApiResponse>('/services', serviceData);
    return data;
  },

  updateService: async (id: string, serviceData: any) => {
    const { data } = await api.put<ApiResponse>(`/services/${id}`, serviceData);
    return data;
  },

  deleteService: async (id: string) => {
    const { data } = await api.delete<ApiResponse>(`/services/${id}`);
    return data;
  },
};

// Projects API
export const projectsAPI = {
  getProjects: async (params?: { status?: string; category?: string; limit?: number; page?: number }) => {
    const { data } = await api.get<ApiResponse>('/projects', { params });
    return data;
  },

  getFeaturedProjects: async (limit?: number) => {
    const { data } = await api.get<ApiResponse>('/projects/featured', { params: { limit } });
    return data;
  },

  getAllProjects: async (params?: { limit?: number; page?: number }) => {
    const { data } = await api.get<ApiResponse>('/projects/admin', { params });
    return data;
  },

  getProject: async (id: string) => {
    const { data } = await api.get<ApiResponse>(`/projects/${id}`);
    return data;
  },

  createProject: async (projectData: any) => {
    const { data } = await api.post<ApiResponse>('/projects', projectData);
    return data;
  },

  updateProject: async (id: string, projectData: any) => {
    const { data } = await api.put<ApiResponse>(`/projects/${id}`, projectData);
    return data;
  },

  deleteProject: async (id: string) => {
    const { data } = await api.delete<ApiResponse>(`/projects/${id}`);
    return data;
  },
};

// About API
export const aboutAPI = {
  getAbout: async () => {
    const { data } = await api.get<ApiResponse>('/about');
    return data;
  },

  updateAbout: async (aboutData: any) => {
    const { data } = await api.put<ApiResponse>('/about', aboutData);
    return data;
  },

  getAboutStats: async () => {
    const { data } = await api.get<ApiResponse>('/about/stats');
    return data;
  },
};

// Contact API
export const contactAPI = {
  createContact: async (contactData: any) => {
    const { data } = await api.post<ApiResponse>('/contact', contactData);
    return data;
  },

  getContacts: async (params?: { page?: number; limit?: number; isRead?: boolean; priority?: string }) => {
    const { data } = await api.get<ApiResponse>('/contact', { params });
    return data;
  },

  getContact: async (id: string) => {
    const { data } = await api.get<ApiResponse>(`/contact/${id}`);
    return data;
  },

  updateContact: async (id: string, updates: any) => {
    const { data } = await api.put<ApiResponse>(`/contact/${id}`, updates);
    return data;
  },

  markAsRead: async (id: string) => {
    const { data } = await api.patch<ApiResponse>(`/contact/${id}/read`);
    return data;
  },

  markAsReplied: async (id: string) => {
    const { data } = await api.patch<ApiResponse>(`/contact/${id}/replied`);
    return data;
  },

  sendReply: async (id: string, replyData: { subject: string; message: string }) => {
    const { data } = await api.post<ApiResponse>(`/contact/${id}/reply`, replyData);
    return data;
  },

  deleteContact: async (id: string) => {
    const { data } = await api.delete<ApiResponse>(`/contact/${id}`);
    return data;
  },

  getContactStats: async () => {
    const { data } = await api.get<ApiResponse>('/contact/stats');
    return data;
  },
};

// Upload API
export const uploadAPI = {
  uploadImages: async (files: File[]) => {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('images', file);
      });
      
      // Create a separate axios instance for file uploads  
      const baseURL = process.env.NEXT_PUBLIC_API_URL 
        ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') // Remove /api suffix if present
        : 'http://localhost:5000';
      
      const uploadInstance = axios.create({
        baseURL: baseURL,
        timeout: 30000, // 30 seconds timeout for uploads
      });
      
      // Add auth token
      const token = Cookies.get('auth_token');
      if (token) {
        uploadInstance.defaults.headers.Authorization = `Bearer ${token}`;
      }
      
      console.log('Uploading files:', files.map(f => ({ name: f.name, size: f.size, type: f.type })));
      
      const { data } = await uploadInstance.post<ApiResponse>('/api/upload', formData);
      return data;
    } catch (error) {
      console.error('Upload API Error:', error);
      throw error;
    }
  },
};

// Error handler helper
export const handleApiError = (error: any, defaultMessage = 'An error occurred') => {
  let message = defaultMessage;

  if (error.response?.data?.message) {
    message = error.response.data.message;
  } else if (error.message) {
    message = error.message;
  }

  toast.error(message);
  console.error('API Error:', error);
  return message;
};

export default api;
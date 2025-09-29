'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { authAPI, handleApiError } from '@/lib/api';

interface User {
  id: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    const token = Cookies.get('auth_token');
    
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await authAPI.getProfile();
      if (response.success && response.data) {
        setUser(response.data);
      } else {
        // Invalid token, remove it
        Cookies.remove('auth_token');
        setUser(null);
      }
    } catch (error) {
      // Token is invalid or expired
      Cookies.remove('auth_token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await authAPI.login({ username, password });
      
      if (response.success && response.data?.token) {
        // Store token in cookie
        Cookies.set('auth_token', response.data.token, { expires: 1 }); // 1 day
        
        // Get user profile
        await checkAuth();
        return true;
      }
      return false;
    } catch (error) {
      handleApiError(error, 'Login failed. Please check your credentials.');
      return false;
    }
  };

  const logout = () => {
    Cookies.remove('auth_token');
    setUser(null);
    
    // Redirect to home page if on admin page
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
      window.location.href = '/';
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
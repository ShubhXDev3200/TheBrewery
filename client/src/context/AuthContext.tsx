import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import { API_URL } from '../services/api';
import { User, AuthContextType, RegisterData, LoginResponse, ApiResponse } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUser(token);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUser = async (token: string): Promise<void> => {
        try {
            const res = await axios.get<ApiResponse<User>>(`${API_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(res.data.data || null);
        } catch (err) {
            localStorage.removeItem('token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string): Promise<void> => {
        const res = await axios.post<LoginResponse>(`${API_URL}/auth/login`, { email, password });
        localStorage.setItem('token', res.data.token);
        setUser(res.data.data);
    };

    const register = async (userData: RegisterData): Promise<void> => {
        const res = await axios.post<LoginResponse>(`${API_URL}/auth/register`, userData);
        localStorage.setItem('token', res.data.token);
        setUser(res.data.data);
    };

    const logout = (): void => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const updateProfile = async (formData: FormData): Promise<void> => {
        const token = localStorage.getItem('token');
        const res = await axios.put<ApiResponse<User>>(`${API_URL}/auth/profile`, formData, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        setUser(res.data.data || null);
    };

    const value: AuthContextType = {
        user,
        login,
        register,
        logout,
        updateProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};


'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type UserRole = 'student' | 'admin' | 'counselor' | null;

interface AuthState {
  isAuthenticated: boolean;
  userRole: UserRole;
  userName: string | null;
}

interface AuthContextType {
  authState: AuthState;
  login: (role: UserRole, name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    userRole: null,
    userName: null,
  });

  useEffect(() => {
    const storedAuth = sessionStorage.getItem('authState');
    if (storedAuth) {
      setAuthState(JSON.parse(storedAuth));
    }
  }, []);

  const login = (role: UserRole, name: string) => {
    const newState = { isAuthenticated: true, userRole: role, userName: name };
    setAuthState(newState);
    sessionStorage.setItem('authState', JSON.stringify(newState));
  };

  const logout = () => {
    const newState = { isAuthenticated: false, userRole: null, userName: null };
    setAuthState(newState);
    sessionStorage.removeItem('authState');
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

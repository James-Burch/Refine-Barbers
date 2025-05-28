import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Barber } from '../types';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  currentUser: Barber | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Barber | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // For demo purposes, we'll use a simple password check
      if (password === 'demo123') {
        const { data: barber, error } = await supabase
          .from('barbers')
          .select('*')
          .eq('email', email)
          .single();

        if (error || !barber) {
          return false;
        }

        setCurrentUser(barber);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Convert Supabase user to our User interface
  const convertSupabaseUser = (supabaseUser: SupabaseUser): User => {
    return {
      id: supabaseUser.id,
      name: supabaseUser.user_metadata?.full_name || 
            supabaseUser.user_metadata?.name || 
            supabaseUser.email?.split('@')[0] || 
            'User',
      email: supabaseUser.email || '',
      avatar_url: supabaseUser.user_metadata?.avatar_url
    };
  };

  // Handle auth state changes
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const convertedUser = convertSupabaseUser(session.user);
        setUser(convertedUser);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const convertedUser = convertSupabaseUser(session.user);
          setUser(convertedUser);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      throw new Error(error.message);
    }

    if (data.user) {
      const convertedUser = convertSupabaseUser(data.user);
      setUser(convertedUser);
      setIsAuthenticated(true);
      toast.success('Welcome back!');
    }
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          name: name,
        },
      },
    });

    if (error) {
      toast.error(error.message);
      throw new Error(error.message);
    }

    // Note: User will need to confirm email before being fully authenticated
    if (data.user && data.session) {
      const convertedUser = convertSupabaseUser(data.user);
      setUser(convertedUser);
      setIsAuthenticated(true);
      toast.success('Account created successfully!');
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      toast.error(error.message);
      throw new Error(error.message);
    }
    
    // The redirect will handle the rest of the authentication flow
  };

  const logout = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast.error(error.message);
      throw new Error(error.message);
    }

    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoading,
      login, 
      register, 
      signInWithGoogle,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
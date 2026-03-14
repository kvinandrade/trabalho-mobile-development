import React, { createContext, useContext, useMemo, useState } from 'react';

type User = {
  email: string;
};

type AuthContextValue = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const VALID_CREDENTIALS = {
  email: 'aluno@faculdade.com',
  password: 'modulo123',
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Simulação de login sem backend.
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (email.trim().toLowerCase() !== VALID_CREDENTIALS.email) {
      throw new Error('E-mail não encontrado');
    }
    if (password !== VALID_CREDENTIALS.password) {
      throw new Error('Senha incorreta');
    }

    setUser({ email: email.trim().toLowerCase() });
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

import React, { createContext, useContext } from '../../deps.ts'; // Adjusted import path

interface AuthContextType {
  user: null; // Simplified for placeholder
  session: null; // Simplified for placeholder
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const value: AuthContextType = { // Added explicit type for value
    user: null,
    session: null,
    loading: false,
    signOut: async () => { console.log("Placeholder signOut"); },
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


import { useContext } from 'react';
// User, Session, supabase imports will be needed in the AuthProvider file.
import { AuthContext } from './auth.context';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider has been moved to a separate file (e.g., src/contexts/AuthProvider.tsx or src/providers/AuthProvider.tsx)

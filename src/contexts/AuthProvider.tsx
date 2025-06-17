import React, { useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthContext, AuthContextType } from '@/hooks/auth.context'; // Adjust path as needed

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auth durumu değişikliklerini dinle
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => { // _event is often unused, can be prefixed
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Mevcut session'ı kontrol et
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => { // Renamed to avoid conflict
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    // setUser(null); // Optionally clear user/session state immediately on sign out
    // setSession(null);
  };

  const value: AuthContextType = { // Ensure value matches AuthContextType
    user,
    session,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

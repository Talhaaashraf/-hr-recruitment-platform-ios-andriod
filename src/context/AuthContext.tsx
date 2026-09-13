import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { UserRole } from '../types';

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  role: UserRole | null;
  isLoading: boolean;
  errorMessage: string | null;
  setRole: (role: UserRole) => void;
  signOut: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRoleState] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch role from Supabase profile
  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      if (error) {
        setErrorMessage(error.message);
        setRoleState(null);
      } else if (data) {
        setRoleState(data.role as UserRole);
      }
    } catch (e) {
      console.error('Error fetching role', e);
      setErrorMessage('Failed to fetch role');
      setRoleState(null);
    }
  };

  // Initialize auth state and listen for changes
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user?.id) await fetchUserRole(session.user.id);
      setIsLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user?.id) await fetchUserRole(session.user.id);
      else setRoleState(null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const setRole = useCallback((newRole: UserRole) => {
    setRoleState(newRole);
    // Phase 2: persist to Supabase profiles table here
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setRoleState(null);
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, role, isLoading, errorMessage, setRole, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

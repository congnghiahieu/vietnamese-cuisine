import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, useSegments, useRootNavigation, useRootNavigationState } from 'expo-router';
import { onAuthStateChanged, User as AuthUser } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/config/firebase';

type AuthContextValue = {
  user: AuthUser | null;
};
const initialValue: AuthContextValue = {
  user: null,
};

const AuthContext = createContext<AuthContextValue>(initialValue);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth hook must be used within Auth Provider');
  }

  return context;
};

export const useProtectedRoute = (user: AuthUser | null) => {
  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const [hasNavigated, setHasNavigated] = useState(false);
  useEffect(() => {
    // if (!navigationState.key || hasNavigated) return;
    // console.log(segments);
    // (sidebar)(protected)
    const inProtectedGroup = segments.includes('(protected)' as never);
    // const from = '/' + segments.join('/');
    // console.log(from);
    // setHasNavigated(true);
    if (!user?.uid && inProtectedGroup) {
      router.replace('/(app)/auth/login');
    }
    //   setHasNavigated(true);
    // } else if (user?.uid && !inProtectedGroup) {
    //   router.replace('/(app)/(sidebar)/(home)');
    //   setHasNavigated(true);
    // }
  }, [user?.uid, segments]);
};

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  useProtectedRoute(user);

  useEffect(() => {
    const unscribeAuth = onAuthStateChanged(FIREBASE_AUTH, user => {
      if (user?.uid) {
        console.log('user logged in');
      } else {
        console.log('no user');
      }

      setUser(user);
    });
    return () => unscribeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

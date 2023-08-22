'use client';

import { createContext, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { ReactNode } from "react";

type authContextType = {
    user: string | null;
};

const authContextDefaultValues: authContextType = {
    user: null,
};

export const AuthContext = createContext<authContextType>(authContextDefaultValues);

type Props = {
    accessToken: string | null;
    children: ReactNode;
};

const AuthProvider = ({ accessToken, children } : Props) => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== accessToken) {
        router.refresh();
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, [accessToken, supabase, router]);

  return children;
};

export default AuthProvider;
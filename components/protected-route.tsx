import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../supabase';
import { User } from '@supabase/gotrue-js';
import noop from 'lodash/noop';

export function ProtectedRoute({ children }) {
  useAuth();
  return children;
}

function useAuth() {
  const user = useRef<User>(supabase.auth.user());
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (!user.current && pathname !== '/') {
      push('/');
    } else if (user.current && pathname === '/') {
      push('/create');
    }
  }, [pathname]);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'USER_UPDATED') {
        user.current = session.user;
      } else if (event === 'SIGNED_OUT') {
        user.current = undefined;
      } else if (event === 'SIGNED_IN') {
        push('/create');
      }
    });
    return () => {
      supabase.auth.onAuthStateChange(noop);
    };
  }, []);
  return user.current;
}

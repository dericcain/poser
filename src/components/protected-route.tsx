import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../supabase';
import { User } from '@supabase/gotrue-js';
import noop from 'lodash/noop';

export function ProtectedRoute({ children }) {
  useAuth();
  return children;
}

function useAuth() {
  const [user, setUser] = useState(supabase.auth.user());
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (!supabase.auth.user() && pathname !== '/') {
      push('/');
    }
  }, []);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'USER_UPDATED') {
        setUser(session.user);
      } else if (event === 'SIGNED_OUT' && pathname !== '/') {
        setUser(undefined);
        (async () => await push('/'))();
      } else if (event === 'SIGNED_IN' && pathname === '/') {
        (async () => await push('/create'))();
      }
    });
    return () => {
      supabase.auth.onAuthStateChange(noop);
    };
  }, []);
  return user;
}

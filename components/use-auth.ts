import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useRouter } from 'next/router';

export const useAuth = () => {
  const [user, setUser] = useState<User>();
  const { push } = useRouter();
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session.user);
        await push('create');
      } else if (event === 'SIGNED_OUT') {
        setUser(undefined);
        await push('/');
      } else if (event === 'USER_UPDATED') {
        setUser(session.user);
      }
    });
  }, []);
  return user;
};

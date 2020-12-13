import { cloneElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { supabase } from '../supabase';

function Loader() {
  return (
    <Box h="100vh" display="flex" justifyContent="center" alignItems="center">
      <Spinner color="gray.700" size="xl" />
    </Box>
  );
}

function Redirect({ path }) {
  const { push } = useRouter();
  useEffect(() => {
    (async () => {
      await push(path);
    })();
  }, []);
  return null;
}

export function ProtectedRoute({ children, ...props }) {
  const user = supabase.auth.user();
  return user ? cloneElement(children, props) : <Redirect path="/" />;
}

export function NonProtectedRoute({ children, ...props }) {
  const user = supabase.auth.user();
  return !user ? cloneElement(children, props) : <Redirect path="create" />;
}

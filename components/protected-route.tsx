import { useEffect } from 'react';
import { useRouter } from 'next/router';

function Redirect({ path }) {
  const { push } = useRouter();
  useEffect(() => {
    (async () => {
      await push(path);
    })();
  }, []);
  return null;
}

export function ProtectedRoute({ children: Children, user, ...props }) {
  return user ? <Children {...props} /> : <Redirect path="/" />;
}

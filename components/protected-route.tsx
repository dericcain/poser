import { createElement, useEffect } from 'react';
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

export function ProtectedRoute({ children, user, ...props }) {
  return user ? createElement(children, props) : <Redirect path="/" />;
}

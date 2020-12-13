import { useRouter } from 'next/router';
import { AppContainer, Content, Sidebar } from '../../components/app-container';
import { useEndpoint } from '../../components/endpoint-state';
import { useEffect } from 'react';
import { supabase } from '../../supabase';
import { ProtectedRoute } from '../../components/protected-route';

export default function Edit({ user }) {
  const {
    query: { id },
  } = useRouter();
  const [state, setState] = useEndpoint();

  useEffect(() => {
    if (id) {
      (async () => {
        const { data } = await supabase
          .from('endpoints')
          .select('name, path, attributes')
          .eq('id', id);
        if (data.length > 0) {
          setState(data[0]);
        }
      })();
    }
  }, [id]);

  return (
    <ProtectedRoute user={user}>
      <AppContainer sidebar={<Sidebar />}>
        <Content />
      </AppContainer>
    </ProtectedRoute>
  );
}

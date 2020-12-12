import { useRouter } from 'next/router';
import { AppContainer, Content, Sidebar } from '../../components/app-container';
import { useEndpoint } from '../../components/endpoint-state';
import { useEffect } from 'react';
import { supabase } from '../../supabase';

export default function Edit() {
  const {
    query: { id },
  } = useRouter();
  const [state, setState] = useEndpoint();

  useEffect(() => {
    if (id) {
      (async () => {
        const { data, error } = await supabase
          .from('endpoints')
          .select('name, path, attributes')
          .eq('id', id);
        console.log(data);
        if (data.length > 0) {
          setState(data[0]);
        }
      })();
    }
  }, [id]);

  console.log(state);

  return (
    <AppContainer sidebar={<Sidebar />}>
      <Content />
    </AppContainer>
  );
}

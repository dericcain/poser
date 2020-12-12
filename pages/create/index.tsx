import { EndpointProvider } from '../../components/endpoint-state';
import { AppContainer, Content, Sidebar } from '../../components/app-container';

export default function Create() {
  return (
    <AppContainer sidebar={<Sidebar />}>
      <Content />
    </AppContainer>
  );
}

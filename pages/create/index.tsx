import { AppContainer, Content, Sidebar } from '../../components/app-container';
import { ProtectedRoute } from '../../components/protected-route';

export default function Create() {
  return (
    <ProtectedRoute>
      <AppContainer sidebar={<Sidebar />}>
        <Content />
      </AppContainer>
    </ProtectedRoute>
  );
}

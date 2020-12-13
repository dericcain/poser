import { AppContainer, Content, Sidebar } from '../../components/app-container';
import { ProtectedRoute } from '../../components/protected-route';

export default function Create({ user }) {
  return (
    <ProtectedRoute user={user}>
      <AppContainer sidebar={<Sidebar />}>
        <Content />
      </AppContainer>
    </ProtectedRoute>
  );
}

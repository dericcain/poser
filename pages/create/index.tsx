import { AppContainer, Content, Sidebar } from '../../components/app-container';
import { ProtectedRoute } from '../../components/protected-route';
import { useEffect } from 'react';
import { useClearEndpoints } from '../../components/endpoint-state';

export default function Create() {
  useClearEndpoints();
  return (
    <AppContainer sidebar={<Sidebar />}>
      <Content />
    </AppContainer>
  );
}

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Head from 'next/head';
import { EndpointProvider } from '../components/endpoint-state';
import { ProtectedRoute } from '../components/protected-route';
import { Alert, AlertProvider } from '../components/alert';
import { init } from '../utils';

init();

const theme = extendTheme({
  fonts: {
    body: "'Cutive Mono', monospace",
    mono: "'Cutive Mono', monospace",
  },
});

function MyApp({ Component, pageProps, err }) {
  return (
    <ProtectedRoute>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cutive+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <AlertProvider>
        <EndpointProvider>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} err={err} />
            <Alert />
          </ChakraProvider>
        </EndpointProvider>
      </AlertProvider>
    </ProtectedRoute>
  );
}

export default MyApp;

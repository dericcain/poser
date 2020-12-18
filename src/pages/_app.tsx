import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Head from 'next/head';
import { EndpointProvider } from '../components/endpoint-state';
import { ProtectedRoute } from '../components/protected-route';
import { Alert, AlertProvider } from '../components/alert';
import { init } from '../utils';
import { hotjar } from 'react-hotjar';

init();

if (typeof window !== 'undefined') {
  hotjar.initialize(2165102, 6);
}

const theme = extendTheme({
  fonts: {
    body: "'Cutive Mono', monospace",
    mono: "'Cutive Mono', monospace",
    heading: "'Cutive', serif",
  },
});

function MyApp({ Component, pageProps, err }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cutive+Mono&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cutive&display=swap"
          rel="stylesheet"
        />
      </Head>
      <AlertProvider>
        <EndpointProvider>
          <ChakraProvider theme={theme}>
            <ProtectedRoute>
              <Component {...pageProps} err={err} />
            </ProtectedRoute>
            <Alert />
          </ChakraProvider>
        </EndpointProvider>
      </AlertProvider>
    </>
  );
}

export default MyApp;

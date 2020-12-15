import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Head from 'next/head';
import { EndpointProvider } from '../components/endpoint-state';
import { ProtectedRoute } from '../components/protected-route';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { Alert, AlertProvider } from '../components/alert';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://1c5fe00102584560ac4e001acf25c96e@o491848.ingest.sentry.io/5558083',
    autoSessionTracking: true,
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
}

const theme = extendTheme({
  fonts: {
    body: "'Cutive Mono', monospace",
    mono: "'Cutive Mono', monospace",
  },
});

function MyApp({ Component, pageProps }) {
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
            <Component {...pageProps} />
            <Alert />
          </ChakraProvider>
        </EndpointProvider>
      </AlertProvider>
    </ProtectedRoute>
  );
}

export default MyApp;

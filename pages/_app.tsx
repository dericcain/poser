import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Head from 'next/head';
import { EndpointProvider } from '../components/endpoint-state';
import { useAuth } from '../components/use-auth';

const theme = extendTheme({
  fonts: {
    body: "'Cutive Mono', monospace",
    mono: "'Cutive Mono', monospace",
  },
});

function MyApp({ Component, pageProps }) {
  const user = useAuth();
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cutive+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <EndpointProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} user={user} />
        </ChakraProvider>
      </EndpointProvider>
    </>
  );
}

export default MyApp;

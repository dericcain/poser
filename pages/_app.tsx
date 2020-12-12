import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Head from 'next/head';

const theme = extendTheme({
  fonts: {
    body: "'Cutive Mono', monospace",
    mono: "'Cutive Mono', monospace",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cutive+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;

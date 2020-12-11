import { ChakraProvider, Container } from '@chakra-ui/react';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Container maxW="5xl">
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;

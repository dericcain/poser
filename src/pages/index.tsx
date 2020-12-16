import Head from 'next/head';
import { Box, Button, Text } from '@chakra-ui/react';
import { supabase } from '../supabase';
import { Logo } from '../images/logo';

export default function Home() {
  const login = async () => {
    await supabase.auth.signIn({ provider: 'github' });
  };

  return (
    <>
      <Head>
        <title>Poser</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        display="flex"
        flexDirection="column"
        h="100vh"
        alignItems="center"
        justifyContent="center"
        pb={10}
      >
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Box mb={5}>
            <Logo />
          </Box>
          <Text fontSize="lg">Build mock endpoints with ease.</Text>
          <Button
            mt={10}
            backgroundColor="gray.800"
            color="white"
            _hover={{ bg: '#000' }}
            onClick={login}
          >
            Get started!
          </Button>
          <Text fontSize="xs" mt={5}>
            (You will be logged in via Github.)
          </Text>
        </Box>
      </Box>
    </>
  );
}

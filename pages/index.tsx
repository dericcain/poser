import Head from 'next/head';
import Link from 'next/link';
import { Box, Heading, Button, Text } from '@chakra-ui/react';
import { db } from '../db';

export default function Home() {
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
          <Heading
            mb={5}
            as="h1"
            fontWeight="normal"
            fontFamily="mono"
            size="4xl"
            textStyle="fonts.mono"
          >
            Poser
          </Heading>
          <Text>Build mock endpoints with ease.</Text>
          <Link href="/create">
            <Button mt={5} backgroundColor="gray.800" color="white" _hover={{ bg: '#000' }}>
              Create endpoint
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

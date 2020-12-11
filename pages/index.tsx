import Head from 'next/head';
import { Box, Container, Heading, Button } from '@chakra-ui/react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Poser</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box display="flex" flexDirection="column">
        <Box width="100%" p={3}>
          <Heading>Time to create an endpoint</Heading>
        </Box>
        <Box width="100%" p={3}>
          <Link href="/create">
            <Button>Create endpoint</Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

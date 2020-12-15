import { AppContainer, Content, Sidebar } from '../../components/app-container';
import { Box, Code, Text, Divider } from '@chakra-ui/layout';
import { useState } from 'react';
import { Button } from '@chakra-ui/button';
import { useClearEndpoints } from '../../components/endpoint-state';
import { ProtectedRoute } from '../../components/protected-route';

function Tips() {
  const [show, setShow] = useState(false);
  const toggleTips = () => {
    setShow((s) => !s);
  };
  return (
    <>
      {show && (
        <Box>
          <Text mb={5}>
            Poser uses the{' '}
            <a href="http://marak.github.io/faker.js/" target="_blank">
              Faker.js
            </a>{' '}
            library to generate fake data for your endpoint. The "Type" dropdown has most of the
            Faker methods. More will be implemented along with a way to pass arguments to those
            methods.
          </Text>
          <Text mb={5}>
            If you want to create nested objects, use dot notation, e.g.,{' '}
            <Code>address.street</Code> would create an <Code>address</Code> key which is an object
            with <Code>street</Code> as a key.
          </Text>
          <Text>
            If you want to create an array, you can type <Code>ids.0</Code> and then choose the
            type. For now, if you want to create multiple items, you will need to add an index for
            each item you want created, e.g., <Code>ids.0</Code>, <Code>ids.1</Code>,{' '}
            <Code>ids.2</Code>. (A better way to do this will be implemented in an upcoming
            release.) Also, you can have an array of objects by doing this:{' '}
            <Code>users.0.name</Code>, <Code>users.0.email</Code>, etc.
          </Text>
        </Box>
      )}
      <Button variant="link" onClick={toggleTips} size="sm" my={5}>
        {show ? 'Hide' : 'Show'} tips
      </Button>
      {show && <Divider mb={5} />}
    </>
  );
}

export default function Create() {
  useClearEndpoints();
  return (
    <ProtectedRoute>
      <AppContainer sidebar={<Sidebar />}>
        <Content tips={<Tips />} />
      </AppContainer>
    </ProtectedRoute>
  );
}

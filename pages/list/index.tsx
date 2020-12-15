import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import { AppContainer } from '../../components/app-container';
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  Box,
  Center,
  Spinner,
  Code,
  Divider,
  Text,
  Link as StyledLink,
} from '@chakra-ui/react';
import Link from 'next/link';

function Tips() {
  const [show, setShow] = useState(false);
  const toggleTips = () => {
    setShow((s) => !s);
  };
  return (
    <>
      {show && (
        <Box>
          <Text mb={5} textAlign="center">
            You can pass the <Code>size</Code> query parameter to your GET call to tell the API how
            many items you want returned. For example,{' '}
            <Code>https://poser.app/api/123?size=100</Code>
            would return 100 items in the array. Currently, 500 is the maximum size that can be
            returned.
          </Text>
        </Box>
      )}
      <Center>
        <Button variant="link" onClick={toggleTips} size="sm" my={5}>
          {show ? 'Hide' : 'Show'} tips
        </Button>
      </Center>
      {show && <Divider mb={5} />}
    </>
  );
}

export default function List() {
  const [endpoints, setEndpoints] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('endpoints').select('id, name, key, path, attributes');
      setEndpoints(data);
      setLoading(false);
    })();
  }, []);

  return (
    <AppContainer sidebar={undefined}>
      <Box p={10}>
        {loading ? (
          <Center>
            <Spinner size="xl" />
          </Center>
        ) : (
          <>
            <Tips />
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>URL</Th>
                  <Th />
                </Tr>
              </Thead>
              <Tbody>
                {endpoints &&
                  endpoints.map((e) => (
                    <Tr key={e.id}>
                      <Td>{e.name}</Td>
                      <Td>
                        <StyledLink
                          isExternal
                          href={`https://poser.app/api/${e.id}`}
                          target="_blank"
                        >{`https://poser.app/api/${e.id}`}</StyledLink>
                      </Td>
                      <Td>
                        <Link href={`edit/${e.id}`}>
                          <Button size="xs" variant="outline">
                            Edit
                          </Button>
                        </Link>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </>
        )}
      </Box>
    </AppContainer>
  );
}

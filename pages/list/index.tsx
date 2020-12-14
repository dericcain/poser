import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import { AppContainer } from '../../components/app-container';
import { Table, Tbody, Td, Th, Thead, Tr, Button, Box, Center, Spinner } from '@chakra-ui/react';
import Link from 'next/link';

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
                    <Td>{`https://poser.app/api/${e.id}`}</Td>
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
        )}
      </Box>
    </AppContainer>
  );
}

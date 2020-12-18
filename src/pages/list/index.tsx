import { useEffect, useRef, useState } from 'react';
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
  AlertDialogOverlay,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
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
          <InfoOutlineIcon mr={2} />
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
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();
  const endpointToDelete = useRef<string>();

  const fetchEndpoints = async () => {
    const user = supabase.auth.user();
    const { data } = await supabase
      .from('endpoints')
      .select('id, name, key, path, attributes')
      .eq('user_id', user.id);
    setEndpoints(data);
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await fetchEndpoints();
    })();
  }, []);

  const confirmDeleteEndpoint = (id: string) => () => {
    endpointToDelete.current = id;
    setIsOpen(true);
  };

  const deleteEndpoint = async () => {
    await supabase.from('endpoints').delete().eq('id', endpointToDelete.current);
    endpointToDelete.current = undefined;
    onClose();
    await fetchEndpoints();
  };

  const onClose = () => setIsOpen(false);

  return (
    <>
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
                  {endpoints.length > 0 ? (
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
                        <Td textAlign="right">
                          <Link href={`edit/${e.id}`}>
                            <Button size="xs" variant="outline">
                              Edit
                            </Button>
                          </Link>
                          <Button
                            size="xs"
                            variant="outline"
                            color="red.500"
                            ml={2}
                            onClick={confirmDeleteEndpoint(e.id)}
                          >
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colspan="3">No endpoints yet</Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </>
          )}
        </Box>
      </AppContainer>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Endpoint
            </AlertDialogHeader>
            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={deleteEndpoint} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

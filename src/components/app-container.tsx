import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  Input,
  Select,
  Text,
  Heading,
  Divider,
  Code,
  Link as StyledLink,
} from '@chakra-ui/react';
import {
  fakerOptions,
  useAttributesTree,
  useCreateEndpoint,
  useEndpointAttributes,
  useEndpointName,
  useUpdateEndpoint,
} from './endpoint-state';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LogoSmall } from '../images/logo-small';

export function AppContainer({ children, sidebar }) {
  return (
    <Box h="100vh">
      <Header />
      {sidebar ? (
        <Grid templateColumns="auto 420px" h="calc(100vh - 72px)">
          {children}
          {sidebar}
        </Grid>
      ) : (
        children
      )}
    </Box>
  );
}

export function Content({ isEdit = false, tips = undefined }) {
  const {
    query: { id },
  } = useRouter();
  const [name, setName] = useEndpointName();
  const { attributes, addAttribute, changeAttribute } = useEndpointAttributes();
  const [createEndpoint, loadingCreate] = useCreateEndpoint();
  const [updateEndpoint, loadingUpdate] = useUpdateEndpoint(id as string);
  const loading = loadingUpdate || loadingCreate;

  return (
    <Box display="flex" flexDirection="column" p={10} overflowY="auto">
      <Heading size="lg" color="#777" fontWeight="300" mb={5}>
        {isEdit ? 'Edit endpoint' : 'Create endpoint'}
      </Heading>
      {isEdit && (
        <Text mb={5}>
          This endpoint's URL is{' '}
          <StyledLink href={`https://poser-eta.vercel.app/api/${id}`} target="_blank">
            https://poser-eta.vercel.app/api/{id}
          </StyledLink>
          . (Don't forget, you can use the <Code>size</Code> query param, e.g.,{' '}
          <StyledLink href={`https://poser-eta.vercel.app/api/${id}?size=50`} target="_blank">
            https://poser-eta.vercel.app/api/{id}?size=50
          </StyledLink>
          )
        </Text>
      )}
      {tips}
      <Box>
        <form onSubmit={isEdit ? updateEndpoint : createEndpoint}>
          <FormControl id="name" isRequired mb={5}>
            <FormLabel>Endpoint name</FormLabel>
            <Input value={name as any} onChange={setName as any} size="sm" />
          </FormControl>
          <Divider my={10} />
          {!isEdit && (
            <Text size="sm" mb={5}>
              This is where you create the shape of the JSON objects that will be returned from your
              endpoint. Be sure to check out the tips above.
            </Text>
          )}
          {attributes.map((a, i) => (
            <HStack key={i} mb={5}>
              <FormControl id={`${a.name}-name-${i}`}>
                <FormLabel>Attribute Name</FormLabel>
                <Input value={a.name} onChange={changeAttribute('name', i)} size="sm" />
              </FormControl>
              <FormControl id={`${a.name}-type-${i}`}>
                <FormLabel>Type</FormLabel>
                <Select
                  placeholder="Select type..."
                  value={a.type}
                  onChange={changeAttribute('type', i)}
                  size="sm"
                >
                  {fakerOptions.map((o) => (
                    <option value={o} key={o}>
                      {o}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </HStack>
          ))}
          <Box mt={10}>
            <Button onClick={addAttribute} backgroundColor="gray.200" isFullWidth>
              Add attribute
            </Button>
          </Box>
          <Box mt={4}>
            <Button
              backgroundColor="gray.800"
              color="white"
              _hover={{ bg: '#000' }}
              type="submit"
              isFullWidth
              isLoading={loading}
            >
              {isEdit ? 'Update' : 'Create'} endpoint
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export function Sidebar() {
  const jsonTree = useAttributesTree();
  return (
    <Box borderLeft="1px solid #CCC" p={10}>
      <Text mb={5}>This is the shape of your object.</Text>
      <Box as="pre" fontSize="xs" backgroundColor="gray.100" p={3} overflowX="auto">
        {jsonTree}
      </Box>
    </Box>
  );
}

export function Header() {
  return (
    <Box px={5} borderBottom="1px solid #CCC" h="72px" display="flex" alignItems="center">
      <LogoSmall />
      <Link href="/list">
        <Button size="sm" variant="outline" marginLeft="auto">
          My endpoints
        </Button>
      </Link>
      <Link href="/create">
        <Button size="sm" marginLeft={2}>
          Create endpoint
        </Button>
      </Link>
    </Box>
  );
}

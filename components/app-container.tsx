import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  HStack,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import {
  fakerOptions,
  useAttributesTree,
  useCreateEndpoint,
  useEndpointAttributes,
  useEndpointName,
} from './endpoint-state';

export function AppContainer({ children, sidebar }) {
  return (
    <Box h="100vh">
      <Header />
      <Grid templateColumns="auto 400px" h="calc(100vh - 60px)">
        {children}
        {sidebar}
      </Grid>
    </Box>
  );
}

export function Content() {
  const [name, setName] = useEndpointName();
  const { attributes, addAttribute, changeAttribute } = useEndpointAttributes();
  const createEndpoint = useCreateEndpoint();
  return (
    <Box display="flex" flexDirection="column" p={10} overflowY="auto">
      <Box>
        <FormControl id="name" isRequired mb={5}>
          <FormLabel>Endpoint name</FormLabel>
          <Input value={name as any} onChange={setName as any} size="sm" />
        </FormControl>
        {attributes.map((a, i) => (
          <HStack key={i} mb={5}>
            <FormControl id={`${a.name}-name-${i}`}>
              <FormLabel>Name</FormLabel>
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
            onClick={createEndpoint}
            backgroundColor="gray.800"
            color="white"
            _hover={{ bg: '#000' }}
            isFullWidth
          >
            Create endpoint
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export function Sidebar() {
  const jsonTree = useAttributesTree();
  return (
    <Box borderLeft="1px solid #444" p={10}>
      <Text mb={5}>This is the shape of your object.</Text>
      <Box as="pre" fontSize="xs" backgroundColor="gray.100" p={3}>
        {jsonTree}
      </Box>
    </Box>
  );
}

export function Header() {
  return (
    <Box px={5} borderBottom="1px solid #444" h="60px" display="flex" alignItems="center">
      <Heading fontFamily="'Cutive Mono', monospace">Poser</Heading>
      <Button variant="outline" marginLeft="auto">
        My endpoints
      </Button>
    </Box>
  );
}

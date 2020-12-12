import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Select,
  Grid,
  Text,
  Code,
  Heading,
} from '@chakra-ui/react';
import { useSetState } from 'react-use';
import produce from 'immer';
import { db } from '../../db';
import { createJson } from '../../utils';

interface Attribute {
  name: string;
  type: 'string' | 'boolean' | 'number';
  value?: string | number;
}
interface State {
  name: string;
  attributes: Attribute[];
}

const attribute: Attribute = { name: '', type: 'string' };
const initialState = {
  name: '',
  attributes: [attribute],
};

const makeKebab = (str: string) =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((s) => s.toLowerCase())
    .join('-');

const fakerOptions = [
  'address.city',
  'address.country',
  'address.latitude',
  'address.longitude',
  'address.state',
  'address.stateAbbr',
  'address.streetAddress',
  'address.streetName',
  'address.zipCode',
  'commerce.color',
  'commerce.department',
  'commerce.price',
  'commerce.product',
  'commerce.productAdjective',
  'commerce.productMaterial',
  'commerce.productName',
  'company.bs',
  'company.bsAdjective',
  'company.bsBuzz',
  'company.bsNoun',
  'company.catchPhrase',
  'company.catchPhraseAdjective',
  'company.catchPhraseDescriptor',
  'company.catchPhraseNoun',
  'company.companyName',
  'database.collation',
  'database.column',
  'database.engine',
  'database.type',
  'image.avatar',
  'image.image',
  'image.imageUrl',
  'internet.avatar',
  'internet.color',
  'internet.domainName',
  'internet.domainSuffix',
  'internet.domainWorld',
  'internet.email',
  'internet.ip',
  'internet.ipv6',
  'internet.mac',
  'internet.password',
  'internet.protocol',
  'internet.url',
  'internet.userAgent',
  'internet.userName',
  'name.firstName',
  'name.gender',
  'name.lastName',
  'phone.phoneNumber',
  'random.alphaNumeric',
  'random.arrayElement',
  'random.boolean',
  'random.image',
  'random.locale',
  'random.number',
  'random.uuid',
  'random.word',
];

export default function Create() {
  const [state, setState] = useSetState<State>(initialState);
  const onNameChange = (e) => {
    setState({ name: e.currentTarget.value });
  };

  const addAttribute = () => {
    setState((s) => ({
      ...s,
      attributes: [...s.attributes, attribute],
    }));
  };

  const onAttributeChange = (type: 'name' | 'type', index: number) => (e) => {
    setState((s) => {
      return produce(s, (d) => {
        d.attributes[index][type] = e.target.value;
      });
    });
  };

  const createEndpoint = async () => {
    await db.from('endpoints').insert([
      {
        ...state,
        path: makeKebab(state.name),
      },
    ]);
  };

  return (
    <Box h="100vh">
      <Box px={5} borderBottom="1px solid #444" h="60px" display="flex" alignItems="center">
        <Heading>Poser</Heading>
      </Box>
      <Grid templateColumns="auto 400px" h="calc(100vh - 60px)">
        <Box display="flex" flexDirection="column" p={10} overflowY="auto">
          <Box>
            <FormControl id="name" isRequired mb={5}>
              <FormLabel>Endpoint name</FormLabel>
              <Input value={state.name} onChange={onNameChange} size="sm" />
            </FormControl>
            {state.attributes.map((a, i) => (
              <HStack key={i} mb={5}>
                <FormControl id={`${a.name}-name-${i}`}>
                  <FormLabel>Name</FormLabel>
                  <Input value={a.name} onChange={onAttributeChange('name', i)} size="sm" />
                </FormControl>
                <FormControl id={`${a.name}-type-${i}`}>
                  <FormLabel>Type</FormLabel>
                  <Select
                    placeholder="Select type..."
                    value={a.type}
                    onChange={onAttributeChange('type', i)}
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
        <Box borderLeft="1px solid #444" p={10}>
          <Text mb={5}>This is the shape of your object.</Text>
          <Box as="pre" fontSize="xs" backgroundColor="gray.100" p={3}>
            {JSON.stringify(createJson(state.attributes), null, 2)}
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}

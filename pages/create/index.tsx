import React from 'react';
import { Box, Button, FormControl, FormLabel, Input, HStack, Select } from '@chakra-ui/react';
import { useSetState } from 'react-use';
import produce from 'immer';
import { db } from '../../db';

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
    <Box maxWidth="400px" display="flex" flexDirection="column">
      <FormControl id="name" isRequired mx={2}>
        <FormLabel>Endpoint name</FormLabel>
        <Input value={state.name} onChange={onNameChange} />
      </FormControl>
      {state.attributes.map((a, i) => (
        <HStack spacing="6px" key={i}>
          <FormControl id={`${a.name}-name-${i}`}>
            <FormLabel>Name</FormLabel>
            <Input value={a.name} onChange={onAttributeChange('name', i)} />
          </FormControl>
          <FormControl id={`${a.name}-type-${i}`}>
            <FormLabel>Type</FormLabel>
            <Select
              placeholder="Select type..."
              value={a.type}
              onChange={onAttributeChange('type', i)}
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
      <Box mt={4}>
        <Button onClick={addAttribute} isFullWidth>
          Add attribute
        </Button>
      </Box>
      <Box mt={2}>
        <Button onClick={createEndpoint} colorScheme="blue" isFullWidth>
          Create endpoint
        </Button>
      </Box>
    </Box>
  );
}

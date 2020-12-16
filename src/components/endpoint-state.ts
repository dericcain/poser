import { useCallback, useEffect, useState } from 'react';
import { createContainer } from 'react-tracked';
import { useSetState } from 'react-use';
import produce from 'immer';
import { supabase } from '../supabase';
import { createJsonWithoutFakeData, id, makeKebab } from '../utils';
import { useRouter } from 'next/router';
import { useAlert } from './alert';

interface Attribute {
  name: string;
  type: typeof fakerOptions[number] | '';
}

interface State {
  name: string;
  attributes: Attribute[];
}

const attribute: Attribute = { name: '', type: '' };

const initialState: State = {
  name: '',
  attributes: [attribute],
};

const useMyState = () => useSetState<State>(initialState);

export const { Provider: EndpointProvider, useTracked: useEndpoint } = createContainer(useMyState);

export const useClearEndpoints = () => {
  const [, setState] = useEndpoint();
  useEffect(() => {
    setState(initialState);
  }, []);
};

export const useUpdateEndpoint = (id: string): [(e: any) => Promise<void>, boolean] => {
  const [state] = useEndpoint();
  const [loading, setLoading] = useState(false);
  const [, setAlert] = useAlert();
  const updateEndpoint = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      await supabase.from('endpoints').update(state).eq('id', id);
      setAlert({ message: 'Your endpoint was updated.', active: true });
    } catch (error) {
      setAlert({
        message: 'There was a problem updating your endpoint.',
        status: 'error',
        active: true,
      });
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };
  return [updateEndpoint, loading];
};

export const useEndpointName = () => {
  const [state, setState] = useEndpoint();

  return [
    state.name,
    useCallback((e) => {
      setState({ name: e.currentTarget.value });
    }, []),
  ];
};

export const useEndpointAttributes = () => {
  const [state, setState] = useEndpoint();
  const addAttribute = () => {
    setState((s) =>
      produce(s, (d) => {
        d.attributes.push(attribute);
      }),
    );
  };

  const changeAttribute = (type: 'name' | 'type', index: number) => (e) => {
    setState((s) => {
      return produce(s, (d) => {
        d.attributes[index][type] = e.target.value;
      });
    });
  };

  return {
    addAttribute,
    attributes: state.attributes,
    changeAttribute,
  };
};

export const useCreateEndpoint = (): [(e: any) => Promise<void>, boolean] => {
  const [state] = useEndpoint();
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const user = supabase.auth.user();
  const createEndpoint = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const { data } = await supabase.from('endpoints').insert([
        {
          ...state,
          path: makeKebab(state.name),
          key: id(),
          user_id: user.id,
        },
      ]);
      setLoading(false);
      await push(`/edit/${data[0].id}`);
    } catch (error) {
      setLoading(false);
      throw new Error(error);
    }
  };

  return [createEndpoint, loading];
};

export const useAttributesTree = () => {
  const { attributes } = useEndpointAttributes();
  return JSON.stringify(createJsonWithoutFakeData(attributes), null, 2);
};

export const fakerOptions = [
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
] as const;

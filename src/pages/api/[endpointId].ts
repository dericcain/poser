import { supabase } from '../../supabase';
import { init } from '../../utils';
import set from 'lodash/set';
import faker from 'faker';
import Cors from 'cors';

init();

const cors = Cors({
  methods: '*',
});

const runMiddleware = (req, res, fn) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

export const createJson = (attrs) =>
  attrs.reduce((f, c) => {
    const [namespace, method] = c.type.split('.');
    const data = faker?.[namespace]?.[method]();
    set(f, c.name, data);
    return f;
  }, {});

const MAX_ARRAY_SIZE = 500;

const buildResponse = (size: number, attrs) => {
  let r: any[] = [];
  let i = 0;
  while (i++ < size) {
    r.push(createJson(attrs));
  }
  return r;
};

export default async (req, res) => {
  let {
    query: { endpointId, size },
  } = req;
  await runMiddleware(req, res, cors);
  const { data, error } = await supabase.from('endpoints').select().eq('id', endpointId);
  if (error || data?.length < 1) {
    return res.status(404).json({ message: 'Not found' });
  }
  const { attributes } = data[0];
  if (size) {
    size = size <= MAX_ARRAY_SIZE ? size : MAX_ARRAY_SIZE;
    return res.status(200).json(buildResponse(+size, attributes));
  }
  return res.status(200).json(createJson(attributes));
};

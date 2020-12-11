import { db } from '../../db';
import { set } from 'lodash';
import faker from 'faker';

const convertAttributes = (attrs) =>
  attrs.reduce((f, c) => {
    const [namespace, method] = c.type.split('.')
    const data = faker[namespace][method]()
    set(f, c.name, data);
    return f;
  }, {});

const buildResponse = (size: number, attrs) => {
  let r: any[] = [];
  let i = 0;
  while (i++ < size) {
    console.log(i);
    r.push(convertAttributes(attrs));
  }
  return r;
}

export default async (req, res) => {
  const {
    query: { endpointId, size },
  } = req;
  const { data, error } = await db.from('endpoints').select().eq('id', endpointId);
  if (error || data?.length < 1) {
    return res.status(404).json({ message: 'Not found' });
  }
  const { attributes } = data[0];
  if (size) {
    return res.status(200).json(buildResponse(+size, attributes));
  }
  return res.status(200).json(convertAttributes(attributes));
};

import { db } from '../../db';
import { createJson } from '../../utils';

const buildResponse = (size: number, attrs) => {
  let r: any[] = [];
  let i = 0;
  while (i++ < size) {
    r.push(createJson(attrs));
  }
  return r;
};

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

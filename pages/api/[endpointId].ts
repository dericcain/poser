import { supabase } from '../../supabase';
import { createJson } from '../../utils';

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
  const { data, error } = await supabase.from('endpoints').select().eq('id', endpointId);
  if (error || data?.length < 1) {
    return res.status(404).json({ message: 'Not found' });
  }
  const { attributes } = data[0];
  size = size <= MAX_ARRAY_SIZE ? size : MAX_ARRAY_SIZE;
  if (size) {
    return res.status(200).json(buildResponse(+size, attributes));
  }
  return res.status(200).json(createJson(attributes));
};

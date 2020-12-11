import { createClient } from '@supabase/supabase-js';

export const db = createClient(
  'https://xvkgapgxlwxldppixzwr.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_KEY,
);

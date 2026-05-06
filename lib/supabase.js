import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const supabase = createClient(
  'https://utnwbrxgwiiejsqwlsjq.supabase.co',
  'sb_publishable_3Hi3MCHsyUoYtRVZUK0hVQ_A9zUYU0-',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

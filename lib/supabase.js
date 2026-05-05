import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://utnwbrxgwiiejsqwlsjq.supabase.co';
const key = process.env.EXPO_PUBLIC_SUPABASE_KEY || 'sb_publishable_3Hi3MCHsyUoYtRVZUK0hVQ_A9zUYU0-';

export const supabase = createClient(url, key, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

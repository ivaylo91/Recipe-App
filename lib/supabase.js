import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const supabase = createClient(
  'https://utnwbrxgwiiejsqwlsjq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0bndicnhnd2lpZWpzcXdsc2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5OTMzODcsImV4cCI6MjA5MzU2OTM4N30.-cjwwKla8PhzpBSbm1Sz8mw3Mre4qIggzwJ1uW0VFis',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

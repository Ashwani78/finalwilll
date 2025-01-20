import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://jizscnkuzejlowarrlle.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppenNjbmt1emVqbG93YXJybGxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczNTE1MzIsImV4cCI6MjA1MjkyNzUzMn0.SV1NKgXvghVyrsITFS_i7G4Nq46-SXGwTz79JFwtun8"

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public'
  }
});

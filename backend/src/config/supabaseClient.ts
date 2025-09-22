import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

const getSupabaseClientWithToken = (accessToken: string) => {
  return createClient(supabaseUrl, supabaseServiceKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
};

const supabase = createClient(supabaseUrl, supabaseKey);

export { getSupabaseClientWithToken, supabase };
// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = "https://cxxdecxctvjbuczkizqz.supabase.co";
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4eGRlY3hjdHZqYnVjemtpenF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA2NzAwNTIsImV4cCI6MjA0NjI0NjA1Mn0.nktgNEbtFiZsuYxnZBwsmDCkQtrQOoudav5L-ZiTftE";
// export const supabase = createClient(supabaseUrl, supabaseKey);

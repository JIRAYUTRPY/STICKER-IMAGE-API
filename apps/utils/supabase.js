import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
dotenv.config();
const supabaseUrl = "https://uamabakrtljqfptzfxje.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhbWFiYWtydGxqcWZwdHpmeGplIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNTQ5MDEwMiwiZXhwIjoyMDIxMDY2MTAyfQ.aydEgKA51C3G6gcpQ5lUgAFg2S4a0ZNo1hS38bbXsU";

export const supabase = createClient(supabaseUrl, supabaseKey);

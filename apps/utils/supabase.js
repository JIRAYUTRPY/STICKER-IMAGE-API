import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
dotenv.config();
const supabaseUrl = "https://uamabakrtljqfptzfxje.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

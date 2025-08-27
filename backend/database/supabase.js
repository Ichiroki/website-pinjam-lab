import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv'

dotenv.config()
const db = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

export default db
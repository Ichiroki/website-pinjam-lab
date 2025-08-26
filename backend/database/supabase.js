import { createClient } from "@supabase/supabase-js";

const db = createClient('https://plzdjtyzxcdsutspqumt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsemRqdHl6eGNkc3V0c3BxdW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNzkzMzgsImV4cCI6MjA3MTc1NTMzOH0.vpVLFaMgk7_q2NGEH1FDnfg2Ix6kZd5-rfP2b6uhfQA')

export default db
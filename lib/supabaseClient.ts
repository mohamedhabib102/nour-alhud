"use client";

import { createClient } from '@supabase/supabase-js';


const supabaseUrl = "https://hkddkxgelkhgseiskulz.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrZGRreGdlbGtoZ3NlaXNrdWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0ODkwMzQsImV4cCI6MjA3OTA2NTAzNH0.-8LWHW7Dei0MxDjADzrrSB3mUrNu2Z4FkNPe19g9WyU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
 
import {createClient} from '@supabase/supabase-js'

const supabaseUrl = 'https://dfaygjqknuowwqykcdxe.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmYXlnanFrbnVvd3dxeWtjZHhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNDIxMjQsImV4cCI6MjA4OTgxODEyNH0.0VSMCq4sJL1jc4vVjIL1i9FBtClk1JcnqnbBpi09pIM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
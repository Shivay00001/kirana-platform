const { createClient } = require('@supabase/supabase-js');

// Fallback for local development WITHOUT credentials
// This allows the app to start, but DB calls will fail gracefully
const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'placeholder';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;

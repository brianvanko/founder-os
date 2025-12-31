import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client for storage operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// For server-side operations that need elevated permissions
export const createSupabaseAdmin = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, serviceRoleKey);
};

// Storage bucket name
export const UPLOADS_BUCKET = "uploads";

// File upload constraints
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "text/plain",
  "text/markdown",
];

// Get user-specific storage path
export const getUserStoragePath = (userId: string, category?: string) => {
  if (category) {
    return `${userId}/${category}`;
  }
  return userId;
};

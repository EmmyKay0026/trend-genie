import { getSupabaseClientWithToken } from "../config/supabaseClient";

const supaBaseBucket = process.env.SUPABASE_BUCKET || "Videos";

export const uploadVideos = async (
  fileName: string,
  token: string,
  file: any
): Promise<any> => {
  const supabase = getSupabaseClientWithToken(token);
  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from(supaBaseBucket)
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
    });
};

import { Request, Response } from "express";
import { supabase } from "../config/supabaseClient";

export const getVideos = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const { data, error } = await supabase
    .from("Content Suite Users")
    .select("id");

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(200).json(data);
};

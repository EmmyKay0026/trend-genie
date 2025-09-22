import { Request, Response } from "express";
import { supabase } from "../config/supabaseClient";

const signUpUser = async (_req: Request, res: Response): Promise<any> => {
  const { email, password } = _req.body;
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return res.status(400).json({ error: error.message });
  res.json({ data });
};

const signInUser = async (_req: Request, res: Response): Promise<any> => {
  const { email, password } = _req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) return res.status(401).json({ error: error.message });
  // console.log(data);

  res.json({ session: data.session });
};

export { signUpUser, signInUser };

import { supabase } from "@/utils/supabaseClientConfig";
import { getUserDetails } from "@/utils/user";
import { create } from "zustand";

interface IsLoading {
  pageLoad: boolean;
  buttonLoad: boolean;
  videoLoad: boolean;
  updatePageLoad: (newState: boolean) => boolean;
  updateButtonLoad: (newState: boolean) => boolean;
  updateVideoLoad: (newState: boolean) => boolean;
}

interface Notifications {
  type: "success" | "error" | "notice" | "default";
  message: string;
}

export const useIsLoadingStore = create<IsLoading>((set, get) => ({
  pageLoad: false,
  buttonLoad: false,
  videoLoad: false,

  updatePageLoad: (newState) => {
    set(() => ({ pageLoad: newState }));
    return newState;
  },
  updateButtonLoad: (newState) => {
    set(() => ({ buttonLoad: newState }));
    return newState;
  },
  updateVideoLoad: (newState) => {
    set(() => ({ videoLoad: newState }));
    return newState;
  },
}));

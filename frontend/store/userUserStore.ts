import { supabase } from "@/utils/supabaseClientConfig";
import { getUserDetails } from "@/utils/user";
import { create } from "zustand";
import { useIsLoadingStore } from "./useAppStore";

interface User {
  id: string;
  name?: string;
  email: string;
  uploadedVideos?: any[];
  repurposedVideos?: any[];
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  getMe: () => Promise<User | null>;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user }),
  getMe: async () => {
    useIsLoadingStore.getState().updatePageLoad(true);
    useIsLoadingStore.getState().updateVideoLoad(true);
    let { user } = get();
    if (user && user.repurposedVideos && user.repurposedVideos?.length > 0) {
      useIsLoadingStore.getState().updatePageLoad(false);
      useIsLoadingStore.getState().updateVideoLoad(false);
      return user;
    }

    const getUser = await getUserDetails();
    if (!getUser || !getUser.email) {
      useIsLoadingStore.getState().updatePageLoad(false);
      useIsLoadingStore.getState().updateVideoLoad(false);
      set({ user: null, isAuthenticated: false });
      return null;
    }

    const { data: videos, error } = await supabase
      .from("Content Suite Videos")
      .select("*")
      .eq("user_id", getUser.id)
      .order("created_at", { ascending: false });
    // console.log(videos, error);
    const { data: repurposedVideos, error: repurposeError } = await supabase
      .from("Content Suite repurposed_assets")
      .select("*")
      .eq("user_id", getUser.id)
      .order("created_at", { ascending: false });

    // console.log("repurpose:", repurposedVideos, repurposeError);
    if (repurposeError) {
      alert(repurposeError.message);
      return null;
    }
    const userDetails: User = {
      id: getUser.id,
      email: getUser.email as string,
      uploadedVideos: videos || [],
      repurposedVideos: repurposedVideos || [],
    };

    // console.log("User details: ", userDetails);

    // Map the returned user to match the User interface
    // const user: User = {
    //   id: getUser.id,
    //   // name: getUser.name,
    //   email: getUser.email as string,
    //   // uploadedVideos: getUser.uploadedVideos,
    //   // repurposedVideos: getUser.repurposedVideos,
    // };
    set({ user: userDetails, isAuthenticated: true });
    useIsLoadingStore.getState().updatePageLoad(false);
    useIsLoadingStore.getState().updateVideoLoad(false);
    // console.log("update user");

    return user;
  },
  clearUser: () => set({ user: null }),
}));

export default useUserStore;

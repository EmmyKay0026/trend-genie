import { create } from "zustand";

interface VideoState {
  videoUrl: string;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  setVideoUrl: (url: string) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  reset: () => void;
}
interface UploadedVideoState {
  file: File | null;
  setFile: (file: File | null) => void;
  reset: () => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  videoUrl: "",
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  setVideoUrl: (url) => set({ videoUrl: url }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  reset: () =>
    set({
      videoUrl: "",
      isPlaying: false,
      currentTime: 0,
      duration: 0,
    }),
}));

export const useUploadedVideoStore = create<UploadedVideoState>((set) => ({
  file: null,
  setFile: (file) => set({ file }),
  reset: () => set({ file: null }),
}));

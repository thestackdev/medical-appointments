import { Session } from "@/types";
import { create } from "zustand";

interface UserStore {
  user: Session | null;
  setUser: (state: Session) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (state) => set({ user: state }),
}));

export default useUserStore;

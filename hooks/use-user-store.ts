import { Session } from "@/types";
import { create } from "zustand";

interface UserStore {
  user: Session | null;
  isAdmin: boolean;
  setUser: (state: Session) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAdmin: false,
  setUser: (state) => {
    set({
      user: state,
      isAdmin: state?.accountType === "admin",
    });
  },
}));

export default useUserStore;

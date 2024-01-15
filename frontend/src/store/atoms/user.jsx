import { atom } from "recoil";

export const userAtom = atom({
  key: "user",
  default: {
    userId: "",
    name: "",
    xp: 0,
    isAuthenticated: false,
  },
});

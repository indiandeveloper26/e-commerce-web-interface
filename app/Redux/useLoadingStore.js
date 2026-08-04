import { create } from "zustand";

const useLoadingStore = create((set) => ({
  loadingg: false,

  startLoading: () => {
    console.log("START FUNCTION CALL");
    set({ loadingg: true });
  },

  stopLoading: () => {
    console.log("STOP FUNCTION CALL");
    set({ loadingg: false });
  },
}));

export default useLoadingStore;
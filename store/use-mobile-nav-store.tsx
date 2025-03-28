import { create } from 'zustand';

interface State {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useMobileNavStore = create<State>(set => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));

export default useMobileNavStore;

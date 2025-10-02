
import { create } from 'zustand';
import { auth } from '../config/firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

export const useAuthStore = create((set) => ({
  currentUser: null,
  loading: true, 
  setLoading: (isLoading) => set({ loading: isLoading }),

  setUser: (user) => set({ currentUser: user }),

  handleSignOut: async () => {
    try {
      await signOut(auth);
      set({ currentUser: null });
      toast.success("You have been signed out successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Error signing out. Please try again.", {
        position: "top-right",
        autoClose: 4000,
      });
    }
  },
}));

onAuthStateChanged(auth, (user) => {
 
  useAuthStore.getState().setUser(user);
  useAuthStore.getState().setLoading(false);
});
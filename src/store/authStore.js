
import { create } from 'zustand';
import { auth } from '../config/firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';

export const useAuthStore = create((set) => ({
  currentUser: null,
  loading: true, 
  setLoading: (isLoading) => set({ loading: isLoading }),

  setUser: (user) => set({ currentUser: user }),

  handleSignOut: async () => {
    try {
      await signOut(auth);
      set({ currentUser: null });
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  },
}));

onAuthStateChanged(auth, (user) => {
 
  useAuthStore.getState().setUser(user);
  useAuthStore.getState().setLoading(false);
});
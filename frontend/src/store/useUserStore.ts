import type { User } from '@/types/Credential';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserState = {
   email: string;
   role: string;
   setUser: (user: User) => void;
   clearUser: () => void;
};

export const useUserStore = create<UserState>()(
   persist(
      set => ({
         email: '',
         role: '',
         setUser: (user: User) => set({ email: user.email, role: user.role }),
         clearUser: () => set({ email: '', role: '' }),
      }),
      {
         name: 'user-storage',
      }
   )
);

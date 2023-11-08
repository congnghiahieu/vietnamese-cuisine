import { create } from 'zustand';
import { User } from 'firebase/auth';

type State = {
  user: User | null | undefined;
};

type Actions = {
  setUser: (user: State['user']) => void;
};

export const authStates = create<State & Actions>()(set => ({
  user: null,
  setUser: user =>
    set({
      user,
    }),
}));

export const useAuthStates = () => authStates(state => state);

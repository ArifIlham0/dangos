import {create} from 'zustand';
import api from '../services/api';
import {User} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserState = {
  isLoadingUser: boolean;
  succMessage: string | null;
  errMessage: string | null;
  setSuccMessage: (newMessage: string | null) => void;
  setErrMessage: (newMessage: string | null) => void;
  error: boolean;
  users: User[];
  createUser: (req: User) => Promise<void>;
};

const useUserStore = create<UserState>(set => ({
  isLoadingUser: false,
  errMessage: null,
  succMessage: null,
  setErrMessage: newMessage => set({errMessage: newMessage}),
  setSuccMessage: newMessage => set({succMessage: newMessage}),
  error: false,
  users: [],

  createUser: async (req: User) => {
    try {
      set({
        isLoadingUser: true,
        succMessage: null,
        errMessage: null,
        error: false,
      });
      const response = await api.post('/create-user', {...req});
      await AsyncStorage.setItem('uuid', response.data.data.uuid);
      set({users: response.data.data, succMessage: response.data.message});
    } catch (error: any) {
      set({
        error: true,
        errMessage: error.response?.data?.message,
      });
    } finally {
      set({isLoadingUser: false});
    }
  },
}));

export default useUserStore;

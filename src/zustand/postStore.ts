import {create} from 'zustand';
import api from '../services/api';
import {Post} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type PostState = {
  isLoading: boolean;
  message: string | null;
  error: boolean;
  posts: Post[];
  fetchPosts: () => Promise<void>;
};

const usePostStore = create<PostState>(set => ({
  isLoading: false,
  message: null,
  error: false,
  posts: [],

  fetchPosts: async () => {
    try {
      set({isLoading: true, message: null, error: false});
      const uuid = await AsyncStorage.getItem('uuid');
      const url = uuid ? `/fetch-posts?uuid=${uuid}` : '/fetch-posts';
      console.log('ini url', url);

      const response = await api.get(url);
      set({posts: response.data.data});
    } catch (error: any) {
      set({
        error: true,
        message: error.response?.data?.message,
      });
    } finally {
      set({isLoading: false});
    }
  },
}));

export default usePostStore;

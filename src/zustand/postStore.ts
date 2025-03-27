import {create} from 'zustand';
import api from '../services/api';
import {CreatePost, Post} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type PostState = {
  isLoadingPost: boolean;
  succMessage: string | null;
  errMessage: string | null;
  setSuccMessage: (newMessage: string | null) => void;
  setErrMessage: (newMessage: string | null) => void;
  error: boolean;
  posts: Post[];
  myPosts: Post[];
  fetchPosts: () => Promise<void>;
  fetchMyPosts: () => Promise<void>;
  createPost: (req: CreatePost) => Promise<void>;
};

const usePostStore = create<PostState>(set => ({
  isLoadingPost: false,
  errMessage: null,
  succMessage: null,
  setErrMessage: newMessage => set({errMessage: newMessage}),
  setSuccMessage: newMessage => set({succMessage: newMessage}),
  error: false,
  posts: [],
  myPosts: [],

  fetchPosts: async () => {
    try {
      set({
        isLoadingPost: true,
        errMessage: null,
        succMessage: null,
        error: false,
      });
      const uuid = await AsyncStorage.getItem('uuid');
      console.log('uuid', uuid);
      const url = uuid ? `/fetch-posts?uuid=${uuid}` : '/fetch-posts';
      const response = await api.get(url);
      set({posts: response.data.data});
    } catch (error: any) {
      set({
        error: true,
        errMessage: error.response?.data?.message,
      });
    } finally {
      set({isLoadingPost: false});
    }
  },

  fetchMyPosts: async () => {
    try {
      set({
        isLoadingPost: true,
        errMessage: null,
        succMessage: null,
        error: false,
      });
      const uuid = await AsyncStorage.getItem('uuid');
      const response = await api.get(`/my-posts?uuid=${uuid}`);
      set({myPosts: response.data.data});
    } catch (error: any) {
      set({
        error: true,
        errMessage: error.response?.data?.message,
      });
    } finally {
      set({isLoadingPost: false});
    }
  },

  createPost: async (req: CreatePost) => {
    try {
      set({
        isLoadingPost: true,
        errMessage: null,
        succMessage: null,
        error: false,
      });
      const response = await api.post('/create-post', {...req});
      set({succMessage: response.data.message});
    } catch (error: any) {
      set({
        error: true,
        errMessage: error.response?.data?.message,
      });
    } finally {
      set({isLoadingPost: false});
    }
  },
}));

export default usePostStore;

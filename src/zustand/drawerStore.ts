import {create} from 'zustand';

type DrawerState = {
  isDrawerOpen: boolean;
  setDrawerOpen: (isOpen: boolean) => void;
  drawerName: string;
  setDrawerName: (name: string) => void;
};

const useDrawerStore = create<DrawerState>(set => ({
  isDrawerOpen: false,
  setDrawerOpen: isOpen => set({isDrawerOpen: isOpen}),
  drawerName: '',
  setDrawerName: name => set({drawerName: name}),
}));

export default useDrawerStore;

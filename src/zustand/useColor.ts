import useThemeStore from '../zustand/themeStore';
import COLORS from '../constants/color';

const useColors = () => {
  const {isDarkMode} = useThemeStore();
  return COLORS(isDarkMode);
};

export default useColors;

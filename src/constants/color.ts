const COLORS = (isDarkMode: boolean) => ({
  background: isDarkMode ? '#171717' : '#FFFFFF',
  primary: '#5790DF',
  secondary: '#E6EEFA',
  text: isDarkMode ? '#FFFFFF' : '#000000',
  icon: '#28303F',
  tabBar: '#5790DF',
  tabBarOpacity: 'rgba(87, 144, 223, 0.6)',
  bgModal: 'rgba(0, 0, 0, 0.5)',
  placeholder: 'rgba(108, 122, 156, 0.6)',
  error: '#fa9d9d',
  success: '#97F7DF',
  white: '#FFFFFF',
  darkBlue: '#093D89',
  gray: '#6C7A9C',
  black: '#000000',
  red: '#fa1302',
});

export default COLORS;

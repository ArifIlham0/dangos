import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const PersonIcon = (props: SvgProps) => (
  <Svg width={14} height={19} viewBox="0 0 14 19" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 8.3C9.20914 8.3 11 6.50914 11 4.3C11 2.09086 9.20914 0.300003 7 0.300003C4.79086 0.300003 3 2.09086 3 4.3C3 6.50914 4.79086 8.3 7 8.3ZM7 18.3C10.866 18.3 14 16.5091 14 14.3C14 12.0909 10.866 10.3 7 10.3C3.13401 10.3 0 12.0909 0 14.3C0 16.5091 3.13401 18.3 7 18.3Z"
      fill="#28303F"
    />
  </Svg>
);
export default PersonIcon;

import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const MinusIcon = (props: SvgProps) => (
  <Svg width={25} height={6} viewBox="0 0 25 6" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.875 0H3.125C1.39922 0 0 1.3425 0 3C0 4.6575 1.39922 6 3.125 6H21.875C23.6008 6 25 4.6575 25 3C25 1.3425 23.6008 0 21.875 0Z"
      fill="white"
    />
  </Svg>
);
export default MinusIcon;

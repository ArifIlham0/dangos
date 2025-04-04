import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const PlusIconWhite = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M9 21C9 22.6569 10.3431 24 12 24C13.6569 24 15 22.6569 15 21V15H21C22.6569 15 24 13.6569 24 12C24 10.3431 22.6569 9 21 9H15V3C15 1.34315 13.6569 0 12 0C10.3431 0 9 1.34315 9 3V9L3 9C1.34315 9 0 10.3431 0 12C0 13.6569 1.34315 15 3 15L9 15V21Z"
      fill="white"
    />
  </Svg>
);
export default PlusIconWhite;

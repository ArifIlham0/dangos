import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const HomeIcon = (props: SvgProps) => (
  <Svg width={18} height={21} viewBox="0 0 18 21" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 8.45033V16.2668C18 18.4943 16.2091 20.3 14 20.3H4C1.79086 20.3 0 18.4943 0 16.2668V8.45033C0 7.23938 0.539645 6.0925 1.46986 5.32653L6.46986 1.20935C7.9423 -0.00311124 10.0577 -0.00311375 11.5301 1.20935L16.5301 5.32653C17.4604 6.0925 18 7.23938 18 8.45033ZM12.25 15.55V17.8C12.25 18.3523 11.8023 18.8 11.25 18.8H6.75C6.19772 18.8 5.75 18.3523 5.75 17.8V15.55C5.75 13.7551 7.20507 12.3 9 12.3C10.7949 12.3 12.25 13.7551 12.25 15.55Z"
      fill="white"
    />
  </Svg>
);
export default HomeIcon;

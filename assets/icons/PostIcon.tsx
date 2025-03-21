import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const PostIcon = (props: SvgProps) => (
  <Svg width={20} height={19} viewBox="0 0 20 19" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 0.300003H9.14286C12.3782 0.300003 15.0902 2.58735 15.8118 5.66435C15.9348 6.18908 16 6.73677 16 7.3C16 11.166 12.93 14.3 9.14286 14.3H4.96161H2.28571C1.02335 14.3 0 13.2553 0 11.9667V8.46667C0 3.95634 3.58172 0.300003 8 0.300003ZM9.42857 16.3H6.05814C7.29491 17.5372 8.98876 18.3 10.8571 18.3H15.0384H17.7143C18.9766 18.3 20 17.2553 20 15.9667V12.4667C20 10.3939 19.2435 8.50143 17.997 7.06136C17.999 7.14065 18 7.2202 18 7.29999C18 12.2706 14.1624 16.3 9.42857 16.3Z"
      fill="white"
    />
  </Svg>
);
export default PostIcon;

import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { fontSize } from "../styles/vars";

function Bill({ size, color, ...props }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size * fontSize}
      height={size * fontSize}
      viewBox="0 0 96.000000 96.000000"
      fill={color}
      {...props}
    >
      <Path
        d="M167 853c-4-3-7-154-7-335 0-361 2-373 60-403 43-22 477-22 520 0 58 30 60 42 60 405 0 373 4 357-77 322l-46-20-48 20-49 21-50-21-50-21-50 21-50 21-49-21c-48-20-49-20-91-1-45 20-63 23-73 12zm528-263v-25l-213-3c-183-2-213 0-218 13-4 8-4 22 0 30 5 13 35 15 218 13l213-3v-25zM535 410v-25l-133-3c-111-2-133 0-138 13-3 8-3 22 0 30 5 13 27 15 138 13l133-3v-25zm160 0c0-22-5-25-43-28-44-3-61 11-48 44 4 11 17 14 48 12 38-3 43-6 43-28zM535 290v-25l-133-3c-111-2-133 0-138 13-3 8-3 22 0 30 5 13 27 15 138 13l133-3v-25zm160 0c0-22-5-25-43-28-31-2-44 1-48 12-13 33 4 47 48 44 38-3 43-6 43-28z"
        transform="matrix(.1 0 0 -.1 0 96)"
      />
    </Svg>
  );
}
Bill.defaultProps = {
  size: 1,
};
export default Bill;

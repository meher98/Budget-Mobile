import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { fontSize } from "../styles/vars";

function Save({ size, color, ...props }) {
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
        d="M298 859c-23-12-46-35-58-59-23-44-28-116-7-107 101 45 149 59 213 64l73 6-20 38c-36 72-127 98-201 58z"
        transform="matrix(.1 0 0 -.1 0 96)"
      />
      <Path
        d="M662 787c-18-7-49-26-70-42-33-27-43-29-95-26-128 7-273-57-328-145-17-28-24-32-35-23-20 17-17 45 7 68 25 23 21 55-7 59-14 2-29-7-43-24-41-52-40-108 4-146 20-17 25-31 25-66 0-65 17-113 61-171 32-42 37-55 29-71-28-53 11-120 70-120 29 0 80 37 80 57 0 5 54 8 120 8s120-3 120-8c0-4 11-19 25-32 64-65 168 14 125 95-8 15-3 29 27 69 31 42 43 51 68 51 45 0 55 16 55 90 0 71-10 90-47 90-17 0-28 11-44 43-12 23-37 57-56 74l-34 33 12 59c17 91 5 104-69 78zm48-302c26-32-13-81-47-59-23 14-28 41-13 59 16 19 44 19 60 0z"
        transform="matrix(.1 0 0 -.1 0 96)"
      />
    </Svg>
  );
}
Save.defaultProps = {
  size: 1,
};
export default Save;

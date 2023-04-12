import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { fontSize } from "../styles/vars";

function CheckDollar({ size, color, ...props }) {
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
        d="M386 870c-63-16-153-70-197-117-22-24-55-74-72-111-29-61-32-76-32-163 0-90 2-99 37-171C186 179 304 96 444 83l67-6-25 38c-26 38-46 94-46 131 0 13-12 26-35 37-42 20-72 71-54 93 18 21 33 17 57-16 13-16 26-30 31-30 4 0 16 18 26 40s26 47 36 56c29 26 23 34-26 34-81 0-135 47-135 117 0 39 32 87 68 102 19 8 32 21 34 34 4 30 52 31 56 1 2-12 17-27 37-37 42-20 72-71 54-93-18-21-33-17-57 16-18 24-30 30-61 30-42 0-71-23-71-57 0-31 32-53 79-53 23 0 55-6 70-14 24-13 33-13 67-1 75 27 161 15 229-31l38-25-6 68c-18 195-179 349-375 359-42 2-94-1-116-6z"
        transform="matrix(.1 0 0 -.1 0 96)"
      />
      <Path
        d="M600 453c-151-79-160-289-16-377 143-89 322 4 334 172 8 119-83 221-206 230-48 3-66-1-112-25zm237-109c2-5-37-50-87-99l-90-90-52 52c-41 42-50 55-40 65 9 9 21 4 52-27l40-39 78 77c72 72 91 84 99 61z"
        transform="matrix(.1 0 0 -.1 0 96)"
      />
    </Svg>
  );
}
CheckDollar.defaultProps = {
  size: 1,
};
export default CheckDollar;

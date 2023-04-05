import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { fontSize } from "../styles/vars";

function Home({ size, color, filled, ...props }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size * fontSize}
      height={size * fontSize}
      viewBox="0 0 96.000000 96.000000"
      fill={color}
      {...props}
    >
      {filled ? (
        <Path
          d="M310 755c-91-73-161-136-172-156-16-29-18-61-18-251 0-184 2-219 16-232 12-13 39-16 124-16 142 0 140-2 140 139 0 70 4 111 12 119 16 16 120 16 136 0 8-8 12-49 12-119 0-141-2-139 140-139 85 0 112 3 124 16 24 23 24 430 0 480-17 36-320 285-346 283-7 0-83-56-168-124z"
          transform="matrix(.1 0 0 -.1 0 96)"
        />
      ) : (
        <Path
          d="M310 755c-91-73-161-136-172-156-16-29-18-61-18-250 0-266-11-249 152-249 150 0 148-2 148 148v112h120V247c0-149-2-147 152-147 99 0 117 3 131 18 25 27 25 427 1 478-17 36-320 285-346 283-7 0-83-56-168-124zm278-27c58-46 125-101 149-124l43-41V160H600v104c0 89-3 107-21 130-19 24-26 26-97 26-64 0-79-3-99-22-21-20-23-30-23-130V160H180v400l28 30c23 26 261 218 271 220 2 0 51-37 109-82z"
          transform="matrix(.1 0 0 -.1 0 96)"
        />
      )}
    </Svg>
  );
}
Home.defaultProps = {
  size: 1,
};
export default Home;

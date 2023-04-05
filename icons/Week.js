import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { fontSize } from "../styles/vars";

function Week({ size, color, filled, ...props }) {
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
          d="M193 825c-39-17-63-52-70-105l-6-40h726l-6 40c-7 54-31 88-72 106-49 20-525 20-572-1zM120 423c0-311-9-303 360-303s360-8 360 303v197H120V423zm457 82c3-9-19-71-50-138-42-95-60-123-76-125-36-6-35 25 4 111 20 45 39 88 42 95 4 9-10 12-51 12-58 0-75 12-62 45 8 22 184 22 193 0z"
          transform="matrix(.1 0 0 -.1 0 96)"
        />
      ) : (
        <>
          <Path
            d="M190 822c-65-32-70-55-70-342 0-377-17-360 360-360s360-17 360 360 17 360-360 360c-223 0-259-2-290-18zm567-64c13-13 23-33 23-50v-28H180v27c0 15 10 37 22 50 21 23 23 23 277 23 248 0 255-1 278-22zm23-335c0-267 30-243-299-243-331 0-301-24-301 242v198h600V423z"
            transform="matrix(.1 0 0 -.1 0 96)"
          />
          <Path
            d="M384 525c-13-33 4-45 62-45 41 0 55-3 51-12-3-7-22-50-42-95-39-86-40-117-4-111 16 2 34 30 76 125 31 67 53 129 50 138-9 22-185 22-193 0z"
            transform="matrix(.1 0 0 -.1 0 96)"
          />
        </>
      )}
    </Svg>
  );
}
Week.defaultProps = {
  size: 1,
};
export default Week;

import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { fontSize } from "../styles/vars";

function Day({ size, color, filled, ...props }) {
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
          d="M193 825c-39-17-63-52-70-105l-6-40h726l-6 40c-7 54-31 88-72 106-49 20-525 20-572-1zM120 423c0-311-9-303 360-303s360-8 360 303v197H120V423zm538 95c4-21-186-237-208-238-25 0-133 114-128 136 6 34 41 27 83-16 21-22 42-40 45-40 4 0 42 41 86 90 56 64 85 90 99 88 11-2 21-11 23-20z"
          transform="matrix(.1 0 0 -.1 0 96)"
        />
      ) : (
        <>
          <Path
            d="M190 822c-65-32-70-55-70-342 0-377-17-360 360-360s360-17 360 360 17 360-360 360c-223 0-259-2-290-18zm567-64c13-13 23-33 23-50v-28H180v27c0 15 10 37 22 50 21 23 23 23 277 23 248 0 255-1 278-22zm23-335c0-267 30-243-299-243-331 0-301-24-301 242v198h600V423z"
            transform="matrix(.1 0 0 -.1 0 96)"
          />
          <Path
            d="M536 450c-44-49-82-90-86-90-3 0-24 18-45 40-42 43-77 50-83 16-5-22 103-136 128-136 8 0 59 50 113 110 98 110 114 142 72 148-14 2-43-24-99-88z"
            transform="matrix(.1 0 0 -.1 0 96)"
          />
        </>
      )}
    </Svg>
  );
}
Day.defaultProps = {
  size: 1,
};
export default Day;

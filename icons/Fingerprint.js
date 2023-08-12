import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { fontSize } from "../styles/vars";

function Fingerprint({ size, color, filled, ...props }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size * fontSize}
      height={size * fontSize}
      viewBox="0 0 256 256"
      fill={color}
      {...props}
    >
      <Path d="M117.8 10.2c-11.2 1.1-25 4-30.3 6.6-3.1 1.5-3.9 5.9-1.5 8.1 2.1 1.9 3.3 1.9 10.1 0 35.1-10.1 71.8-2.5 99.8 20.5 2.6 2.2 5.3 4.6 6.1 5.4 2.7 2.9 5.4 3.5 8 1.9.9-.6 1.7-1.6 2.1-2.6.9-2.9.1-4.4-5.4-9.3-18.6-16.5-39.3-26.1-63.8-29.8-4.6-.6-21-1.1-25.1-.8zM69.9 24.6c-16 8.7-31 22.6-41.6 38.7-7.5 11.4-8.6 14.8-5.9 17.6 1.1 1 1.8 1.4 3.2 1.4 2.5 0 3.8-1.2 5.9-5.1.9-1.8 3-5.3 4.6-7.6 10.3-15.7 21.5-26.1 37.8-35.3 5-2.8 5.8-3.8 5.8-6.6 0-1.8-1-3.4-2.8-4.3-2-1.1-3.2-.9-7 1.2z" />
      <Path d="M116.8 28.8c-29.5 3.4-57 20.3-72.1 44.4C38 83.9 30 91.8 17 100.3c-5.6 3.7-6.4 5.4-4.1 8.2 1.8 2.1 3.5 2 8.4-.8 5.7-3.3 11.2-7.7 18.5-14.8 5.8-5.7 8.2-8.6 16-19.3 14.4-19.8 37.4-32.8 63.3-35.4 6.4-.7 18.6-.3 24.6.7 5.5.9 5.5.9 7.2-.4 1.6-1.4 2.1-3.2 1.3-5.2-.8-1.8-1-2-4.6-2.8-7.6-2-22.1-2.7-30.8-1.7zM161.2 36.9c-1.5 1.5-1.9 3.2-1.2 5 .5 1.2 1.6 1.9 6.1 4.2 23.6 11.8 41.2 31.6 47.8 53.8 2.4 8.1 3.1 13 3.1 23.4 0 9.8-.3 13-2.4 22.3-4.3 19.7-15.6 42.6-29.5 59.9-4.8 6-5 6.4-4.7 8.4.6 3.1 4.5 4.5 7.1 2.4 1.9-1.5 7.8-9.1 12.2-15.6 29.3-43.5 34.5-89 14.1-123.4-9.2-15.5-24.8-29.7-42.3-38.6-6.7-3.3-8.5-3.6-10.3-1.8z" />
      <Path d="M120.8 48.4c-25 2.2-47 15.5-61.7 37.3-11.5 17-23.1 27.1-41.1 35.7-3.4 1.6-6.5 3.3-6.9 3.8-2.7 3-.4 7.7 3.8 7.7 1.5 0 13-5.5 18.8-9 12.3-7.5 19.7-14.8 34.7-34.8C71.9 84.5 76.5 79 78.5 77c9.3-9.1 21.4-15.4 35-18.3 6.6-1.4 19.6-1.5 26.3-.2 19.4 3.8 35.7 14.5 47 30.9 3.3 4.8 4.8 5.7 7.7 4.3 2-.9 3.2-3.1 2.8-4.8-.4-1.7-5.3-8.6-9.4-13.3-12.2-14.2-31-24.3-49.3-26.6-5.6-.8-13.1-1-17.8-.6zM218.4 58.2c-1.6.3-3.5 2.7-3.8 4.6-.2 1.6.1 2.3 2.6 6.1 12.3 18.6 18.4 38.6 18.4 60.9 0 26.3-8.8 49.8-26 69.9-3.1 3.6-3.7 4.6-3.9 6.3-.2 1.8 0 2.2 1.5 3.7 1.4 1.4 1.9 1.6 3.9 1.6 2.1 0 2.4-.1 4.7-2.7 1.4-1.5 4.1-4.7 6-7.2 12.9-16.8 20.5-35.1 23.6-56.5.9-6.9 1.1-21.8.2-28.6-1.9-15.3-5.9-28.3-12.7-41.4-4.8-9.2-9-15.5-11-16.3-.9-.4-1.8-.6-2-.6-.4-.1-1 .1-1.5.2z" />
      <Path d="M120.1 67c-.7.1-2.6.4-4.5.7-10.8 1.7-22.1 7.4-30.2 15.2-4.4 4.3-6.9 7.5-10.1 13.6-4.3 8-9.8 14.2-18.6 21-5.3 4.1-6.2 6.1-4 8.6.7.8 1.7 1.3 3 1.5 1.9.2 2.2.1 6.1-3 7.2-5.6 12.7-11.5 17.4-18.8 6.4-9.8 7.5-11.2 11.6-15.2 6.6-6.3 14-10.6 23-13 4.3-1.2 5.3-1.3 13.3-1.3 7.6 0 9.2.1 12.9 1.1 9.9 2.6 17.9 7.3 25.3 14.8 7.3 7.4 11.7 15.3 13.9 25.2 1.2 5.1 1.4 15.2.4 20-.5 2.6-.5 3.1.1 4.1 1.8 2.8 6.5 2.3 8.1-.8 1.3-2.4 1.5-15.1.4-21.5-4.3-25.9-23.8-45.9-49.7-51.3-3.4-.7-15.8-1.3-18.4-.9z" />
      <Path d="M118.7 87.3c-9.5 2-15.8 5.8-25.4 15.5-5.3 5.3-8.5 9.1-14.4 16.9-4.1 5.5-9 11.6-10.7 13.4C57.7 144 42.9 152.5 25 158.2c-3.3 1-6.5 2.3-7 2.9-2.3 2.2-1.6 6.2 1.3 7.4 1.9.8 3.8.3 12.2-3.1 19.1-7.9 37.1-19.1 44.4-27.7 1.3-1.5 4.5-5.6 7.2-9.2 6.4-8.7 9.8-12.7 15.3-18.2 10.7-10.6 16.7-14.1 25.2-14.9 3.9-.4 4.3-.5 5.5-1.9 1.5-1.6 1.6-3.5.4-5-1.7-2.3-4.2-2.5-10.8-1.2zM140.5 91.8c-.9.8-1.3 1.5-1.3 2.7 0 1.8.8 2.6 6.3 6.1 10.5 6.6 16.4 17.5 16.4 30.2 0 12.1-6.9 23.5-26.4 43-19.1 19.3-40.8 36.3-59.3 46.5-3.3 1.8-6.4 3.7-6.7 4.1-1.1 1.4-.8 4.3.6 5.6 1.6 1.6 3.1 1.3 9.6-2.2 17-9.3 41.9-28 57.4-43.2 18.3-17.9 29.2-32.9 32.2-44.3 1.5-5.4 1.5-14.8 0-20.6-2.6-10.4-8.9-19.5-17-24.7-6.8-4.6-9.5-5.3-11.8-3.2zM198.7 102.8c-2.5 1-3.4 3.4-2.4 6.8 4.8 16.4 3.5 34.1-3.5 49-3.4 7.3-7.8 13.5-19.8 27.9-14.8 17.7-28.9 31.6-47.8 47.1-3.7 3-6.1 5.4-6.5 6.3-1.3 3.1 1.2 6.5 4.5 5.9 3.3-.7 20.4-15.3 36.1-31 35.6-35.6 46.1-53 48.6-80.4.7-7.3.1-15.3-1.6-23.1-1.4-6.1-2.2-7.6-4.1-8.3-1.8-.7-2.2-.7-3.5-.2z" />
      <Path d="M123.4 105c-7.4 1.6-11.8 5.5-23 19.9-3.7 4.8-8.3 10.6-10.3 12.9C85.7 143 76.7 152 71 156.7c-10.3 8.7-24.6 16.3-39.2 20.8-5.6 1.7-6.4 2.3-6.9 4.5-.4 2.1.4 3.8 2 4.4 5.9 2.3 44.9-17.6 55.7-28.4 3.8-3.8 10.9-12.1 23.1-26.8 10.8-13.1 12.9-15.4 15.6-17 2-1.1 2.6-1.3 6.9-1.3 4.3 0 4.9.1 7.2 1.4 3 1.6 5.4 4.3 6.9 7.7 1 2.2 1.2 3 1 6.3-.2 3.2-.4 4.3-1.9 7.1-2.9 5.4-11.3 15.3-23.7 27.7-3.1 3.1-5.9 6.1-6.1 6.7-1.7 3.1.6 6.7 4.1 6.7 1.8 0 2.1-.2 5.8-4.1 2.1-2.3 6.4-6.8 9.6-10.1 9.1-9.6 15.3-17.6 17.6-22.9 3.8-8.4 3.5-17.5-.9-24.2-5.1-7.9-15.4-12.2-24.4-10.2z" />
      <Path d="M127.5 123.1c-.9.3-3.8 3.7-9.2 10.8-10.4 13.7-13.4 17.3-20.6 24.3-9.1 8.8-21.8 17.9-28.3 20.4-3.3 1.2-4.5 2.6-4.5 5.2 0 1.8.2 2.3 1.3 3.3 2 1.7 3.8 1.5 8.6-1 8.7-4.5 22-14.4 30.4-22.7 7.2-7.1 21.8-24.7 26.7-32.2 2.6-4 2.3-6.8-.8-8.1-1.8-.6-1.8-.6-3.6 0zM35.4 132.7c-1 .5-4.6 1.9-7.8 3.3-3.3 1.4-7.7 3.1-9.9 3.9-2.2.8-4.4 1.9-4.9 2.4-2.3 2.2-1.6 6.3 1.3 7.4 1.2.4 2.1.3 4.4-.2 6.6-1.7 21.6-8.4 23.5-10.5 1.3-1.5 1.2-4-.3-5.5-1.5-1.4-3.9-1.7-6.3-.8zM176.1 150.4c-.6.6-1.9 2.5-3 4.4-16 26.3-43.5 54.1-72.7 73.3-10 6.6-10.3 6.9-10.3 9.1s1.8 4 3.7 3.5c1.4-.3 14.5-8.3 20.1-12.2 18.4-12.9 42.6-35.7 57.5-54.3 4.9-6.1 8.4-11.3 10.8-16.2 1.6-3.1 1.7-3.6 1.2-5.1-1-3.4-5.2-4.8-7.3-2.5zM100.4 181.3c-.6.2-2.2 1.4-3.5 2.6-3.2 2.9-15.3 10.9-23.4 15.4-7 3.9-17.2 8.9-19.2 9.4-1.7.4-3.6 2.2-3.9 3.7-.8 3.1 1.2 5.4 4.4 5.4 7 0 40.4-20 48.6-29 1.5-1.6 1.7-2.3 1.7-4 0-2.9-2.1-4.5-4.7-3.5zM51 188c-6.7 2.4-13.3 5-14.4 5.5-1.3.7-2.3 3.1-2 4.8.3 1.5 1.7 3 3.3 3.4 2.9.7 15.5-3.9 19.2-7.1 2-1.7 2.1-4.2.3-6.1-1.6-1.5-3-1.7-6.4-.5zM171 218.4c-.6.3-5.2 4.6-10.2 9.6-8.9 8.7-9.2 9.1-9.2 10.9 0 2.7 1.6 4.5 4.1 4.5 2.4 0 5.4-2.3 13.2-9.8 6.9-6.7 9.4-9.8 9.4-11.4 0-.6-.6-1.8-1.3-2.5-1.5-1.7-4.4-2.3-6-1.3z" />
    </Svg>
  );
}
Fingerprint.defaultProps = {
  size: 1,
};
export default Fingerprint;
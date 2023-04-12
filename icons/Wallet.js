import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { fontSize } from "../styles/vars";

function Wallet({ size, color, ...props }) {
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
        d="M149 811l-29-29V178l29-29 29-29h604l29 29 29 29v241c0 239 0 240-24 268l-24 28-304 5-303 5v50l275 5 275 5v50l-278 3-278 2-30-29zm555-347c31-30 9-84-34-84-24 0-50 26-50 50 0 43 54 65 84 34z"
        transform="matrix(.1 0 0 -.1 0 96)"
      />
    </Svg>
  );
}
Wallet.defaultProps = {
  size: 1,
};
export default Wallet;

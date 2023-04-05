import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { fontSize } from "../styles/vars";

function Budget({ size, color, filled, ...props }) {
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
          d="M386 870c-63-16-153-70-197-117-22-24-55-74-72-111-29-61-32-76-32-163 0-90 2-99 37-171 45-91 103-147 196-191 61-29 76-32 162-32 73 1 105 5 137 20l42 20-45 74c-25 40-44 74-42 75s13 9 24 19c21 18 22 17 65-57 24-42 49-76 55-76s30 21 54 46c45 49 94 146 104 207l7 37H654l-11 30-11 30h249l-7 38c-10 60-59 157-104 206-24 25-48 46-54 46s-31-34-54-75c-24-41-47-75-50-75-10 1-42 26-42 33 0 4 20 39 45 79l44 73-41 19c-48 21-174 30-232 16zm121-207c4-10 22-32 41-50 36-34 38-50 8-67-14-9-21-7-33 12-18 26-55 29-74 6-21-25 2-48 56-56 65-9 90-35 90-94 0-38-5-50-28-70-15-13-34-24-41-24-8 0-16-9-19-20-6-25-45-27-54-2-4 9-22 31-41 49-36 34-38 50-8 67 14 9 21 7 33-11 30-44 124-19 96 25-6 10-30 20-58 24-59 8-85 32-92 87-5 37-2 44 29 74 19 17 37 40 41 50 3 9 16 17 27 17s24-8 27-17z"
          transform="matrix(.1 0 0 -.1 0 96)"
        />
      ) : (
        <>
          <Path
            d="M386 870c-63-16-153-70-197-117-22-24-55-74-72-111-29-61-32-76-32-163 0-90 2-99 37-171 45-91 103-147 196-191 61-29 76-32 162-32s101 3 162 32c93 44 151 100 196 191 35 72 37 81 37 172s-2 100-37 172c-68 136-188 217-336 224-42 2-94-1-116-6zm212-70l32-12-22-37c-12-20-26-44-32-53-8-14-6-21 9-32 11-9 23-16 27-16s19 22 35 50c15 27 31 50 34 50 4 0 25-21 49-46 43-47 73-105 84-161l6-33H632l11-30c11-30 11-30 94-30h83l-6-32c-11-57-41-115-84-162-24-25-45-46-49-46-3 0-19 23-34 51-29 50-29 50-50 32-12-10-23-19-25-19-2-1 10-24 27-50l30-49-32-14c-19-9-66-15-117-15-72-1-94 3-140 25-70 33-136 99-169 169-37 79-37 201 0 280 42 89 117 154 214 187 45 15 162 11 213-7z"
            transform="matrix(.1 0 0 -.1 0 96)"
          />
          <Path
            d="M457 674c-4-4-7-15-7-25s-9-21-20-24c-29-9-53-61-46-100 9-44 35-65 91-73 54-8 77-31 56-56-20-23-78-21-91 4-13 24-33 26-50 5-10-12-9-20 5-41 9-15 25-29 35-31 11-3 20-15 22-27 4-28 47-35 55-8 2 10 20 26 39 35 40 19 58 58 49 103-8 43-34 64-90 72-54 8-77 31-56 56 19 22 58 20 71-4s33-26 50-5c10 12 9 20-4 39-8 14-24 27-35 31-11 3-21 16-23 28-3 22-36 35-51 21z"
            transform="matrix(.1 0 0 -.1 0 96)"
          />
        </>
      )}
    </Svg>
  );
}
Budget.defaultProps = {
  size: 1,
};
export default Budget;

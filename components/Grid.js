import { View } from "react-native";
import React, { Children } from "react";

const Grid = ({ children, nCols, style }) => {
  const splitArray = (inputArray, perChunk) => {
    const result = inputArray.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / perChunk);
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }
      resultArray[chunkIndex].push(item);
      return resultArray;
    }, []);
    return result;
  };
  const childrenArray = Children.toArray(children);
  return (
    <View style={[style]}>
      {splitArray(childrenArray, nCols).map((chunk, i) => (
        <View style={{ flexDirection: "row" }}>
          {chunk.map((child, j) => child)}
        </View>
      ))}
    </View>
  );
};

export default Grid;

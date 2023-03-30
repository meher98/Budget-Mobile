import { Dimensions, View } from "react-native";
import React from "react";
import { tableStyles } from "../styles/table";
import Textc from "./Textc";

const Table = ({ headers, content, parentWidth }) => {
  const transpose = (arr) => {
    return arr[0].map((_, i) => arr.map((row) => row[i]));
  };
  const max = (tab) => {
    let m = 0;
    for (el of tab) {
      if (el?.length > m) {
        m = el.length;
      }
    }
    return m;
  };
  const somme = (array1) => {
    return array1.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
  };
  const trans = transpose([
    headers,
    ...content.map((el, i) => Object.values(el).map((e) => e.toString())),
  ]);
  const maxTab = trans.map((el) => max(el));
  return (
    <View style={[tableStyles.container]}>
      <View style={[tableStyles.table, { width: parentWidth }]}>
        <View style={tableStyles.headersRow}>
          {headers.map((header, i) => (
            <Textc
              color="base"
              style={[
                tableStyles.header,
                {
                  width: (parentWidth * maxTab[i]) / somme(maxTab),
                },
              ]}
              key={i}
            >
              {header}
            </Textc>
          ))}
        </View>
        {content.map((row, i) => (
          <View
            style={
              i === content.length - 1 ? tableStyles.lastRow : tableStyles.row
            }
            key={i}
          >
            {Object.values(row).map((cell, j) =>
              typeof cell !== "object" ? (
                <Textc
                  style={[
                    tableStyles.cell,
                    {
                      width: (parentWidth * maxTab[j]) / somme(maxTab),
                    },
                  ]}
                  key={j}
                >
                  {cell}
                </Textc>
              ) : (
                <View
                  style={[
                    tableStyles.cell,
                    {
                      width: ((parentWidth - 12) * maxTab[j]) / somme(maxTab),
                    },
                  ]}
                  key={j}
                >
                  {cell}
                </View>
              )
            )}
          </View>
        ))}
      </View>
    </View>
  );
};
Table.defaultProps = {
  parentWidth: Dimensions.get("window").width - 40,
};
export default Table;

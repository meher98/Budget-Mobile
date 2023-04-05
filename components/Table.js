import { Dimensions, View } from "react-native";
import React, { useEffect, useState } from "react";
import { tableStyles } from "../styles/table";
import Textc from "./Textc";
import { dateDisplay } from "../utils/functions";

const Table = ({
  headers,
  content,
  parentWidth,
  nbIcons,
  toIgnore,
  dateIndexTab,
}) => {
  const [filtredContent, setFiltredContent] = useState([]);
  useEffect(() => {
    let tab = content.map((el) => {
      let filtredEl = {};
      for (let key of Object.keys(el)) {
        if (!toIgnore?.includes(key)) {
          filtredEl[key] = el[key];
        }
      }
      return filtredEl;
    });
    setFiltredContent([...tab]);
  }, [content]);

  const transpose = (arr) => {
    return arr[0].map((_, i) => arr.map((row) => row[i]));
  };
  const max = (tab) => {
    let m = 0;
    for (let el of tab) {
      if (el === "[object Object]") {
        if (3 * nbIcons > m) {
          m = 3.5 * nbIcons;
        }
      } else {
        if (dateIndexTab.includes(tab.indexOf(el))) {
          if (5 > m) {
            m = 5;
          }
        } else {
          if (el?.length > m) {
            m = el.length;
          }
        }
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
    ...filtredContent.map((el) => Object.values(el).map((e) => e.toString())),
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
                  width: ((parentWidth - 10) * maxTab[i]) / somme(maxTab),
                },
              ]}
              key={i}
            >
              {header}
            </Textc>
          ))}
        </View>
        {filtredContent.length === 0 ? (
          <View style={tableStyles.videText}>
            <Textc>Tableau vide</Textc>
          </View>
        ) : (
          filtredContent.map((row, i) => (
            <View
              style={
                i === filtredContent.length - 1
                  ? tableStyles.lastRow
                  : tableStyles.row
              }
              key={i}
            >
              {Object.values(row).map((cell, j) =>
                typeof cell !== "object" ? (
                  <Textc
                    style={[
                      tableStyles.cell,
                      {
                        width: ((parentWidth - 10) * maxTab[j]) / somme(maxTab),
                      },
                    ]}
                    key={j}
                  >
                    {dateIndexTab.includes(j) ? dateDisplay(cell) : cell}
                  </Textc>
                ) : (
                  <View
                    style={[
                      tableStyles.cell,
                      {
                        width: ((parentWidth - 10) * maxTab[j]) / somme(maxTab),
                      },
                    ]}
                    key={j}
                  >
                    {cell}
                  </View>
                )
              )}
            </View>
          ))
        )}
      </View>
    </View>
  );
};
Table.defaultProps = {
  parentWidth: Dimensions.get("window").width - 40,
  nbIcons: 0,
  content: [],
  toIgnore: [],
  dateIndexTab: [],
};
export default Table;

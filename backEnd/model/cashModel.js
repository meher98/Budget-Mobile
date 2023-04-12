import Sequelize from "rn-sequelize";
import { sequelize } from "../options";

export const Cash = sequelize.define("Cash", {
  date: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  type: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  cash: {
    type: Sequelize.FLOAT,
  },
});

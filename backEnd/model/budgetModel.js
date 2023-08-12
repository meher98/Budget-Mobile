import Sequelize from "rn-sequelize";
import { sequelize } from "../options";

export const Budget = sequelize.define("Budgets", {
  date: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  budget: {
    type: Sequelize.FLOAT,
  },
  reste: {
    type: Sequelize.FLOAT,
  },
});

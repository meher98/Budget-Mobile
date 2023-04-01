import Sequelize from "rn-sequelize";
import { sequelize } from "../options";
import BudgetGlobal from "./budgetGlobalModel";

export const Budget = sequelize.define("Budget", {
  idBudgetGlobal: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: BudgetGlobal,
      key: "id",
    },
  },
  date: {
    type: Sequelize.STRING,
    primaryKey: true,
  },

  montant: {
    type: Sequelize.FLOAT,
  },
});

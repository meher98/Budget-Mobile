import Sequelize from "rn-sequelize";
import { sequelize } from "../options";

export const BudgetGlobal = sequelize.define("BudgetGlobal", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  dateDebut: {
    type: Sequelize.STRING,
  },
  dateFin: {
    type: Sequelize.STRING,
  },
  budget: {
    type: Sequelize.FLOAT,
  },
});

import Sequelize from "rn-sequelize";
import { sequelize } from "../options";

export const BudgetGlobal = sequelize.define("BudgetGlobals", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  dateDebut: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dateFin: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  budget: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  reste: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

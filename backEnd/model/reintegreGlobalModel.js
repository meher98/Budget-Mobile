import Sequelize from "rn-sequelize";
import { sequelize } from "../options";

export const ReintegreGlobal = sequelize.define("ReintegreGlobal", {
  dateRetire: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  dateIntegre: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.STRING,
  },
  montant: {
    type: Sequelize.FLOAT,
  },
});

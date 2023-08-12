import Sequelize from "rn-sequelize";
import { sequelize } from "../options";

export const Reintegre = sequelize.define("Reintegre", {
  dateRetire: {
    type: Sequelize.STRING,
  },
  dateIntegre: {
    type: Sequelize.STRING,
  },
  montant: {
    type: Sequelize.FLOAT,
  },
  type: {
    type: Sequelize.STRING,
  },
  global: {
    type: Sequelize.STRING,
    references: {
      model: "ReintegreGlobals",
      key: "dateRetire",
    },
  },
});

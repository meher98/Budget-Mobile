import Sequelize from "rn-sequelize";
import { sequelize } from "../options";

export const Depense = sequelize.define("Depense", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: Sequelize.STRING,
  },
  comment: {
    type: Sequelize.STRING,
  },
  montant: {
    type: Sequelize.FLOAT,
  },
});

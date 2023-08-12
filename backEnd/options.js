import * as SQLite from "expo-sqlite";
import Sequelize from "rn-sequelize";

export const sequelize = new Sequelize({
  dialectModule: SQLite,
  database: "budgetDB",
  // logging: false,
  dialectOptions: {
    version: "1.0",
    description: "Test DB",
    //size: 2 * 1024 * 1024
  },
});

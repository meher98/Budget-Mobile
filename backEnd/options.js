import * as SQLite from "expo-sqlite";
import Sequelize from "rn-sequelize";

export const sequelize = new Sequelize({
  dialectModule: SQLite,
  database: "budgetDB",
  dialectOptions: {
    version: "1.0",
    description: "Test DB",
    //size: 2 * 1024 * 1024
  },
});

export const testDB = async () => {
  sequelize.sync();

  User.findAll()
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

import { BudgetGlobal } from "../model/budgetGlobalModel";

export const getAllBudgetGlobal = () =>
  new Promise((resolve, reject) => {
    try {
      let all = BudgetGlobal.findAll();

      resolve(
        all.map((el) => {
          return {
            id: el.dataValues.id,
            budget: el.dataValues.budget,
            dateDebut: el.dataValues.dateDebut,
            dateFin: el.dataValues.dateFin,
          };
        })
      );
    } catch (e) {
      reject(e);
    }
  });
export const addBudgetGlobal = async (values) =>
  new Promise(async (resolve, reject) => {
    try {
      var added = await BudgetGlobal.create(values);
      resolve({
        id: added.dataValues.id,
        budget: added.dataValues.budget,
        dateDebut: added.dataValues.dateDebut,
        dateFin: added.dataValues.dateFin,
      });
    } catch (e) {
      reject(e);
    }
  });

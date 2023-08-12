// import { dateDiffrence, getDatesInRange } from "../../utils/functions";
// import { BudgetGlobal } from "../model/budgetGlobalModel";
// import { Budget } from "../model/budgetModel";
// import { sequelize } from "../options";

// export const getAllBudgetGlobal = () =>
//   new Promise((resolve, reject) => {
//     try {
//       let all = BudgetGlobal.findAll();

//       resolve(
//         all.map((el) => {
//           return {
//             id: el.dataValues.id,
//             budget: el.dataValues.budget,
//             dateDebut: el.dataValues.dateDebut,
//             dateFin: el.dataValues.dateFin,
//             reste: el.dataValues.reste,
//           };
//         })
//       );
//     } catch (e) {
//       reject(e);
//     }
//   });
// export const addBudgetGlobal = async (values) =>
//   new Promise(async (resolve, reject) => {
//     const t = await sequelize.transaction();
//     const budget = Number(parseFloat(values.budget).toFixed(2));
//     const nbJours = dateDiffrence(values.dateDebut, values.dateFin) + 1;
//     const joursTab = getDatesInRange(values.dateDebut, values.dateFin);

//     try {
//       const added = await BudgetGlobal.create(
//         { ...values, budget: budget, reste: budget },
//         { transaction: t }
//       );
//       for (let jour of joursTab) {
//         await Budget.create(
//           {
//             idBudgetGlobal: added.dataValues.id,
//             date: jour,
//             budget: parseFloat(budget / nbJours).toFixed(2),
//             reste: parseFloat(budget / nbJours).toFixed(2),
//           },
//           { transaction: t }
//         );
//       }
//       await t.commit();
//       resolve({
//         id: added.dataValues.id,
//         budget: added.dataValues.budget,
//         dateDebut: added.dataValues.dateDebut,
//         dateFin: added.dataValues.dateFin,
//         reste: added.dataValues.reste,
//       });
//     } catch (e) {
//       await t.rollback();
//       reject(e);
//     }
//   });

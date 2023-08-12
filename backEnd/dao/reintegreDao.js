import { Op, Sequelize } from "rn-sequelize";
import {
  convertDate,
  getDaysInMonth,
  getDaysInWeek,
  getFormatWeekFromDate,
  getNextDay,
  getNextMonth,
  getNextWeek,
  oneDigit,
  twoDigits,
} from "../../utils/functions";
import { Budget } from "../model/budgetModel";
import { ReintegreGlobal } from "../model/reintegreGlobalModel";
import { Reintegre } from "../model/reintegreModel";
import { sequelize } from "../options";
import { getBudgetByMonth, getBudgetByWeek } from "./budgetDao";

const addOrUpdateDay = async (values) => {
  const t = await sequelize.transaction();
  try {
    const montant = Number(parseFloat(values.montant).toFixed(2));
    let thisDayBudget = await Budget.findOne(
      {
        where: { date: values.date },
      },
      { transaction: t }
    );
    if (!thisDayBudget) {
      reject({ msg: "Pas de budget" });
    } else {
      let dayReintegre = await Reintegre.findOne(
        { where: { dateRetire: values.date, type: values.type } },
        { transaction: t }
      );
      let dayBudget = await Budget.findOne(
        { where: { date: getNextDay(values.date) } },
        { transaction: t }
      );
      if (dayReintegre) {
        if (dayBudget) {
          dayBudget.reste = (
            parseFloat(dayBudget.reste) -
            parseFloat(dayReintegre.montant) +
            parseFloat(montant)
          ).toFixed(2);
          await dayBudget.save({ transaction: t });
        } else {
          await Budget.create(
            {
              date: getNextDay(values.date),
              budget: 0,
              reste: parseFloat(montant).toFixed(2),
            },
            { transaction: t }
          );
        }
        thisDayBudget.reste = (
          parseFloat(thisDayBudget.reste) +
          parseFloat(dayReintegre.montant) -
          parseFloat(montant)
        ).toFixed(2);
        dayReintegre.montant = montant;
        await thisDayBudget.save({ transaction: t });
        await dayReintegre.save({ transaction: t });
      } else {
        await Reintegre.create(
          {
            dateRetire: values.date,
            dateIntegre: getNextDay(values.date),
            type: values.type,
            montant: values.montant,
          },
          { transaction: t }
        );
        thisDayBudget.reste = (
          parseFloat(thisDayBudget.reste) - parseFloat(montant)
        ).toFixed(2);
        await thisDayBudget.save({ transaction: t });
        if (dayBudget) {
          dayBudget.reste = (
            parseFloat(dayBudget.reste) + parseFloat(montant)
          ).toFixed(2);
          await dayBudget.save({ transaction: t });
        } else {
          await Budget.create(
            {
              date: getNextDay(values.date),
              budget: 0,
              reste: parseFloat(montant).toFixed(2),
            },
            { transaction: t }
          );
        }
      }
      await t.commit();
      return "ok";
    }
  } catch (e) {
    await t.rollback();
    throw e;
  }
};
const addOrUpdateGlobal = async (values) => {
  const montant = Number(parseFloat(values.montant).toFixed(2));
  let joursTab;
  let globalBudget;
  let nextGlobal;
  let nextJourTab;

  if (values.type === "semaine") {
    globalBudget = await getBudgetByWeek(values.date);
    joursTab = getDaysInWeek(values.date);
    nextGlobal = getNextWeek(values.date);
    nextJourTab = getDaysInWeek(nextGlobal);
  } else if (values.type === "mois") {
    globalBudget = await getBudgetByMonth(values.date);
    joursTab = getDaysInMonth(values.date);
    nextGlobal = getNextMonth(values.date);
    nextJourTab = getDaysInMonth(nextGlobal);
  }
  const t = await sequelize.transaction();
  try {
    let reintegreGlobal = await ReintegreGlobal.findOne(
      { where: { dateRetire: values.date, type: values.type } },
      { transaction: t }
    );

    if (globalBudget) {
      if (reintegreGlobal) {
        let allReintegre = await Reintegre.findAll({
          where: {
            type: values.type,
            global: values.date,
          },
        });
        for (let el of allReintegre) {
          let budgetRetire = await Budget.findOne({
            where: {
              date: el.dataValues.dateRetire,
            },
          });
          let budgetIntegre = await Budget.findOne({
            where: {
              date: el.dataValues.dateIntegre,
            },
          });

          if (budgetRetire) {
            budgetRetire.reste = (
              parseFloat(budgetRetire.dataValues.reste) +
              parseFloat(el.dataValues.montant)
            ).toFixed(2);
            await budgetRetire.save({ transaction: t });
          }
          if (budgetIntegre) {
            budgetIntegre.reste = (
              parseFloat(budgetIntegre.dataValues.reste) -
              parseFloat(el.dataValues.montant)
            ).toFixed(2);
            await budgetIntegre.save({ transaction: t });
          }
          await el.destroy({ transaction: t });
        }
        await reintegreGlobal.destroy({ transaction: t });
      }
      let resteMontant = montant;
      await ReintegreGlobal.create(
        {
          dateRetire: values.date,
          dateIntegre: nextGlobal,
          montant: parseFloat(values.montant).toFixed(2),
          type: values.type,
        },
        { transaction: t }
      );
      if (montant < 0) {
        let budgetTab = await Budget.findAll({
          where: {
            [Op.and]: {
              date: joursTab,
              reste: {
                [Op.lt]: 0,
              },
            },
          },
        });
        budgetTab = budgetTab.sort(
          (a, b) => b.dataValues.reste - a.dataValues.reste
        );
        for (let budgetJour of budgetTab) {
          if (budgetJour.dataValues.reste <= resteMontant) {
            await Reintegre.create(
              {
                dateRetire: budgetJour.dataValues.date,
                montant: parseFloat(resteMontant).toFixed(2),
                type: values.type,
                global: values.date,
              },
              { transaction: t }
            );
            budgetJour.reste = (
              parseFloat(budgetJour.dataValues.reste) - parseFloat(resteMontant)
            ).toFixed(2);
            resteMontant = 0;
            await budgetJour.save({ transaction: t });
            break;
          } else {
            await Reintegre.create(
              {
                dateRetire: budgetJour.dataValues.date,
                montant: parseFloat(budgetJour.dataValues.reste),
                type: values.type,
                global: values.date,
              },
              { transaction: t }
            );
            resteMontant = (
              parseFloat(resteMontant) - parseFloat(budgetJour.dataValues.reste)
            ).toFixed(2);
            budgetJour.reste = 0;
            await budgetJour.save({ transaction: t });
          }
        }
        if (resteMontant < 0) {
          let newBudgetTab = await Budget.findAll({
            where: {
              date: joursTab,
            },
          });
          for (let budgetJour of newBudgetTab) {
            budgetJour.reste = (
              parseFloat(budgetJour.dataValues.reste) -
              parseFloat(resteMontant / newBudgetTab.length)
            ).toFixed(2);
            await budgetJour.save({ transaction: t });
          }
        }
      } else {
        let budgetTab = await Budget.findAll({
          where: {
            [Op.and]: {
              date: joursTab,
              budget: {
                [Op.gt]: 0,
              },
            },
          },
        });
        budgetTab = budgetTab.sort(
          (a, b) => a.dataValues.reste - b.dataValues.reste
        );

        beforBudgetTab = budgetTab.filter((el) => {
          let today = new Date();
          jourDate = new Date(convertDate(el.dataValues.date));
          return today > jourDate;
        });

        for (let budgetJour of beforBudgetTab) {
          if (budgetJour.dataValues.reste >= resteMontant) {
            await Reintegre.create(
              {
                dateRetire: budgetJour.dataValues.date,
                montant: parseFloat(resteMontant).toFixed(2),
                type: values.type,
                global: values.date,
              },
              { transaction: t }
            );
            budgetJour.reste = (
              parseFloat(budgetJour.dataValues.reste) - parseFloat(resteMontant)
            ).toFixed(2);
            resteMontant = 0;
            await budgetJour.save({ transaction: t });
            break;
          } else {
            await Reintegre.create(
              {
                dateRetire: budgetJour.dataValues.date,
                montant: parseFloat(budgetJour.dataValues.reste),
                type: values.type,
                global: values.date,
              },
              { transaction: t }
            );
            resteMontant = (
              parseFloat(resteMontant) - parseFloat(budgetJour.dataValues.reste)
            ).toFixed(2);
            budgetJour.reste = 0;
            await budgetJour.save({ transaction: t });
          }
        }

        if (resteMontant < 0) {
          afterBudgetTab = budgetTab.filter((el) => {
            let today = new Date();
            jourDate = new Date(convertDate(el.dataValues));
            return today <= jourDate;
          });
          let i = afterBudgetTab.length;
          for (let budgetJour of afterBudgetTab) {
            if (budgetJour.dataValues.reste >= resteMontant / i) {
              await Reintegre.create(
                {
                  dateRetire: budgetJour.dataValues.date,
                  montant: parseFloat(resteMontant / i).toFixed(2),
                  type: values.type,
                  global: values.date,
                },
                { transaction: t }
              );
              budgetJour.reste = (
                parseFloat(resteMontant) -
                parseFloat(budgetJour.dataValues.reste) -
                parseFloat(resteMontant / i)
              ).toFixed(2);
              resteMontant = parseFloat((resteMontant * (i - 1)) / i).toFixed(
                2
              );
              await budgetJour.save({ transaction: t });
            } else {
              await Reintegre.create(
                {
                  dateRetire: budgetJour.dataValues.date,
                  montant: parseFloat(budgetJour.dataValues.reste),
                  type: values.type,
                  global: values.date,
                },
                { transaction: t }
              );
              resteMontant = (
                parseFloat(resteMontant) -
                parseFloat(budgetJour.dataValues.reste)
              ).toFixed(2);
              budgetJour.reste = 0;
              await budgetJour.save({ transaction: t });
            }
            i--;
          }
        }
        if (resteMontant < 0) {
          let newBudgetTab = await Budget.findAll({
            where: {
              date: joursTab,
            },
          });
          for (let budgetJour of newBudgetTab) {
            budgetJour.reste = (
              parseFloat(budgetJour.dataValues.reste) -
              parseFloat(resteMontant / newBudgetTab.length)
            ).toFixed(2);
            await budgetJour.save({ transaction: t });
          }
        }
      }

      for (const jour of nextJourTab) {
        let jourBudget = await Budget.findOne(
          { where: { date: jour } },
          { transaction: t }
        );
        if (jourBudget) {
          jourBudget.reste = (
            parseFloat(jourBudget.dataValues.reste) +
            parseFloat(values.montant / nextJourTab.length)
          ).toFixed(2);
          await jourBudget.save({ transaction: t });
        } else {
          await Budget.create(
            {
              date: jour,
              budget: 0,
              reste: parseFloat(values.montant / nextJourTab.length).toFixed(2),
            },
            { transaction: t }
          );
        }
        await Reintegre.create(
          {
            dateIntegre: jour,
            montant: parseFloat(values.montant / nextJourTab.length).toFixed(2),
            type: values.type,
            global: values.date,
          },
          { transaction: t }
        );
      }
      await t.commit();
      return values;
    } else {
      throw { msg: "Pas de budget" };
    }
  } catch (e) {
    await t.rollback();
    throw e;
  }
};
export const addReintegre = async (values) =>
  new Promise(async (resolve, reject) => {
    if (values.type === "jour") {
      addOrUpdateDay(values)
        .then((val) => resolve(val))
        .catch((e) => reject(e));
    } else {
      addOrUpdateGlobal(values)
        .then((val) => resolve(val))
        .catch((e) => reject(e));
    }
  });

export const getReintegre = async (values) =>
  new Promise(async (resolve, reject) => {
    try {
      if (values.type === "jour") {
        let reintegreJour = await Reintegre.findOne({
          where: { dateRetire: values.date, type: "jour" },
        });
        let reintegreSemaine = await Reintegre.findOne({
          where: { dateRetire: values.date, type: "semaine" },
        });
        let reintegreMois = await Reintegre.findOne({
          where: { dateRetire: values.date, type: "mois" },
        });
        resolve({
          reintegre: reintegreJour?.dataValues.montant,
          reintegreSemaine: reintegreSemaine?.dataValues.montant,
          reintegreMois: reintegreMois?.dataValues.montant,
        });
      } else {
        let reintegre = await ReintegreGlobal.findOne({
          where: { dateRetire: values.date, type: values.type },
        });
        resolve({
          reintegre: reintegre?.dataValues.montant,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
export const getResidu = async (values) =>
  new Promise(async (resolve, reject) => {
    try {
      if (values.type === "jour") {
        let residuJour = await Reintegre.findOne({
          where: { dateIntegre: values.date, type: "jour" },
        });
        let residuSemaine = await Reintegre.findOne({
          where: { dateIntegre: values.date, type: "semaine" },
        });
        let residuMois = await Reintegre.findOne({
          where: { dateIntegre: values.date, type: "mois" },
        });
        resolve({
          residu: Number(
            (
              parseFloat(
                residuJour?.dataValues.montant
                  ? residuJour.dataValues.montant
                  : 0
              ) +
              parseFloat(
                residuSemaine?.dataValues.montant
                  ? residuSemaine.dataValues.montant
                  : 0
              ) +
              parseFloat(
                residuMois?.dataValues.montant
                  ? residuMois.dataValues.montant
                  : 0
              )
            ).toFixed(2)
          ),
        });
      } else {
        let residu = await ReintegreGlobal.findOne({
          where: { dateIntegre: values.date, type: values.type },
        });
        resolve({
          residu: residu?.dataValues.montant,
        });
      }
    } catch (error) {
      reject(error);
    }
  });

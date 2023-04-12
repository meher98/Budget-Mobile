import { Sequelize } from "rn-sequelize";
import {
  getFormatWeekFromDate,
  oneDigit,
  twoDigits,
} from "../../utils/functions";
import { BudgetGlobal } from "../model/budgetGlobalModel";
import { Budget } from "../model/budgetModel";
import { Cash } from "../model/cashModel";
import { Depense } from "../model/depenseModel";
import { sequelize } from "../options";
const { JsonCalendar } = require("json-calendar");

export const getAllDepensesByDate = async (date) =>
  new Promise(async (resolve, reject) => {
    try {
      let all = await Depense.findAll({ where: { date: date } });
      resolve(
        all.map((el) => {
          return {
            id: el.dataValues.id,
            date: el.dataValues.date,
            montant: el.dataValues.montant,
            commentaire: el.dataValues.commentaire,
          };
        })
      );
    } catch (e) {
      reject(e);
    }
  });
export const getAllDepensesByWeek = async (week) =>
  new Promise(async (resolve, reject) => {
    const weekDate = week.split("/");
    const calendar = new JsonCalendar({
      languageCode: "fr",
      monthIndex: parseInt(oneDigit(weekDate[1])) - 1,
      year: parseInt(weekDate[2]),
    });
    const weekTab = calendar.weeks[parseInt(oneDigit(weekDate[0]))];
    try {
      const all = [];
      for (let day of weekTab) {
        let x = await getAllDepensesByDate(
          `${twoDigits(day.day)}/${twoDigits(day.monthIndex + 1)}/${day.year}`
        )
          .then((val) => val)
          .catch((e) => reject(e));
        all.push(...x);
      }

      resolve(
        all.map((el) => {
          return {
            id: el.id,
            date: el.date,
            montant: el.montant,
            comment: el.commentaire,
          };
        })
      );
    } catch (e) {
      reject(e);
    }
  });

export const getAllDepensesByMonth = async (month) =>
  new Promise(async (resolve, reject) => {
    try {
      let all = await Depense.findAll({
        where: {
          date: {
            [Sequelize.Op.like]: `%${month}`,
          },
        },
      });
      resolve(
        all.map((el) => {
          return {
            id: el.dataValues.id,
            date: el.dataValues.date,
            montant: el.dataValues.montant,
            commentaire: el.dataValues.commentaire,
          };
        })
      );
    } catch (e) {
      reject(e);
    }
  });
export const addDepense = async (values) =>
  new Promise(async (resolve, reject) => {
    const t = await sequelize.transaction();
    const montant = parseFloat(values.montant).toFixed(2);
    try {
      const added = await Depense.create(
        { ...values, montant: montant },
        { transaction: t }
      );
      let budget = await Budget.findOne(
        { where: { date: values.date } },
        { transaction: t }
      );
      budget.reste = parseFloat(budget.dataValues.reste - montant).toFixed(2);
      await budget.save({ transaction: t });
      let budgetGlobal = await BudgetGlobal.findOne(
        { where: { id: budget.dataValues.idBudgetGlobal } },
        { transaction: t }
      );
      budgetGlobal.reste = parseFloat(
        budgetGlobal.dataValues.reste - montant
      ).toFixed(2);
      await budgetGlobal.save({ transaction: t });

      let cashDay = await Cash.findOne(
        { where: { date: values.date, type: "jour" } },
        { transaction: t }
      );
      if (cashDay) {
        cashDay.cash = parseFloat(cashDay.dataValues.cash - montant).toFixed(2);
        await cashDay.save({ transaction: t });
      }

      let cashWeek = await Cash.findOne(
        {
          where: { date: getFormatWeekFromDate(values.date), type: "semaine" },
        },
        { transaction: t }
      );

      if (cashWeek) {
        cashWeek.cash = parseFloat(cashWeek.dataValues.cash - montant).toFixed(
          2
        );
        await cashWeek.save({ transaction: t });
      }

      let cashMonth = await Cash.findOne(
        {
          where: {
            date: `${values.date.split("/")[1]}/${values.date.split("/")[2]}`,
            type: "mois",
          },
        },
        { transaction: t }
      );
      if (cashMonth) {
        cashMonth.cash = parseFloat(
          cashMonth.dataValues.cash - montant
        ).toFixed(2);
        await cashMonth.save({ transaction: t });
      }

      await t.commit();
      resolve({
        date: added.dataValues.date,
        montant: Number(added.dataValues.montant),
        commentaire: added.dataValues.commentaire,
      });
    } catch (e) {
      await t.rollback();
      reject(e);
    }
  });
export const deleteDepense = async (id) =>
  new Promise(async (resolve, reject) => {
    const t = await sequelize.transaction();

    try {
      const toDelete = await Depense.findOne(
        { where: { id: id } },
        { transaction: t }
      );
      let values = toDelete.dataValues;
      const montant = parseFloat(values.montant).toFixed(2);
      let budget = await Budget.findOne(
        { where: { date: values.date } },
        { transaction: t }
      );
      budget.reste = (
        parseFloat(budget.dataValues.reste) + parseFloat(montant)
      ).toFixed(2);
      await budget.save({ transaction: t });
      let budgetGlobal = await BudgetGlobal.findOne(
        { where: { id: budget.dataValues.idBudgetGlobal } },
        { transaction: t }
      );
      budgetGlobal.reste =
        parseFloat(budgetGlobal.dataValues.reste) +
        parseFloat(montant).toFixed(2);
      await budgetGlobal.save({ transaction: t });

      let cashDay = await Cash.findOne(
        { where: { date: values.date, type: "jour" } },
        { transaction: t }
      );
      if (cashDay) {
        cashDay.cash = (
          parseFloat(cashDay.dataValues.cash) + parseFloat(montant)
        ).toFixed(2);
        await cashDay.save({ transaction: t });
      }

      let cashWeek = await Cash.findOne(
        {
          where: { date: getFormatWeekFromDate(values.date), type: "semaine" },
        },
        { transaction: t }
      );

      if (cashWeek) {
        cashWeek.cash = (
          parseFloat(cashWeek.dataValues.cash) + parseFloat(montant)
        ).toFixed(2);
        await cashWeek.save({ transaction: t });
      }

      let cashMonth = await Cash.findOne(
        {
          where: {
            date: `${values.date.split("/")[1]}/${values.date.split("/")[2]}`,
            type: "mois",
          },
        },
        { transaction: t }
      );
      if (cashMonth) {
        cashMonth.cash = (
          parseFloat(cashMonth.dataValues.cash) + parseFloat(montant)
        ).toFixed(2);
        await cashMonth.save({ transaction: t });
      }
      await Depense.destroy({ where: { id: id } }, { transaction: t }),
        await t.commit();
      resolve("ok");
    } catch (e) {
      await t.rollback();
      reject(e);
    }
  });

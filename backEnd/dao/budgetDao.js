import { Sequelize } from "rn-sequelize";
import {
  getDaysInMonth,
  getDaysInWeek,
  oneDigit,
  twoDigits,
} from "../../utils/functions";
import { Budget } from "../model/budgetModel";
import { sequelize } from "../options";
const { JsonCalendar } = require("json-calendar");

export const getBudgetByDate = async (date) =>
  new Promise(async (resolve, reject) => {
    try {
      let budget = await Budget.findOne({ where: { date: date } });
      budget
        ? resolve({
            budget: budget.dataValues.budget,
            reste: budget.dataValues.reste,
          })
        : resolve(false);
    } catch (e) {
      reject(e);
    }
  });

export const getBudgetByWeek = async (week) =>
  new Promise(async (resolve, reject) => {
    const weekDate = week.split("/");
    const calendar = new JsonCalendar({
      languageCode: "fr",
      monthIndex: parseInt(oneDigit(weekDate[1])) - 1,
      year: parseInt(weekDate[2]),
    });
    const weekTab = calendar.weeks[parseInt(oneDigit(weekDate[0]))];
    try {
      const budget = { budget: 0, reste: 0 };
      let verif = false;
      for (let day of weekTab) {
        let x = await getBudgetByDate(
          `${twoDigits(day.day)}/${twoDigits(day.monthIndex + 1)}/${day.year}`
        )
          .then((val) => val)
          .catch((e) => reject(e));
        if (x) {
          budget.budget = Number(
            (parseFloat(budget.budget) + parseFloat(x.budget)).toFixed(2)
          );
          budget.reste = Number(
            (parseFloat(budget.reste) + parseFloat(x.reste)).toFixed(2)
          );
          verif = true;
        }
      }

      verif ? resolve(budget) : resolve(false);
    } catch (e) {
      reject(e);
    }
  });

export const getBudgetByMonth = async (month) =>
  new Promise(async (resolve, reject) => {
    try {
      let all = await Budget.findAll({
        where: {
          date: {
            [Sequelize.Op.like]: `%${month}`,
          },
        },
      });
      if (all.length > 0) {
        const budget = { budget: 0, reste: 0 };
        let z = 0;
        let y = 0;
        for (let x of all) {
          z += x.budget;
          y += x.reste;
        }
        budget.budget = Number(z.toFixed(2));
        budget.reste = Number(y.toFixed(2));
        resolve(budget);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });

export const addBudget = async (values) =>
  new Promise(async (resolve, reject) => {
    const t = await sequelize.transaction();
    const budget = Number(parseFloat(values.budget).toFixed(2));

    let joursTab;
    switch (values.type) {
      case "jour":
        joursTab = [values.date];
        break;
      case "semaine":
        joursTab = getDaysInWeek(values.date);
        break;
      case "mois":
        joursTab = getDaysInMonth(values.date);
        break;
      default:
        break;
    }
    const nbJours = joursTab.length;
    let reste = 0;
    try {
      for (let jour of joursTab) {
        let dayBudget = await Budget.findOne(
          { where: { date: jour } },
          { transaction: t }
        );
        if (dayBudget) {
          dayBudget.reste = Number(
            (
              parseFloat(dayBudget.dataValues.reste) +
              parseFloat(budget / nbJours) -
              parseFloat(dayBudget.dataValues.budget)
            ).toFixed(2)
          );
          dayBudget.budget = parseFloat(budget / nbJours).toFixed(2);
          reste = Number(
            (
              parseFloat(reste) + parseFloat(dayBudget.dataValues.reste)
            ).toFixed(2)
          );
          await dayBudget.save({ transaction: t });
        } else {
          await Budget.create(
            {
              date: jour,
              budget: parseFloat(budget / nbJours).toFixed(2),
              reste: parseFloat(budget / nbJours).toFixed(2),
            },
            { transaction: t }
          );
          reste = Number(
            (parseFloat(reste) + parseFloat(budget / nbJours)).toFixed(2)
          );
        }
      }
      await t.commit();
      resolve({
        budget: Number(budget.toFixed(2)),
        reste: reste,
      });
    } catch (e) {
      await t.rollback();
      reject(e);
    }
  });

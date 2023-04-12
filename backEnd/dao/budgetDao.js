import { Sequelize } from "rn-sequelize";
import { oneDigit, twoDigits } from "../../utils/functions";
import { Budget } from "../model/budgetModel";
const { JsonCalendar } = require("json-calendar");

export const getBudgetByDate = async (date) =>
  new Promise(async (resolve, reject) => {
    try {
      let budget = await Budget.findOne({ where: { date: date } });
      resolve({
        idBudgetGlobal: budget.dataValues.idBudgetGlobal,
        budget: budget.dataValues.budget,
        reste: budget.dataValues.reste,
      });
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
      const budget = { idBudgetGlobal: "", budget: 0, reste: 0 };
      for (let day of weekTab) {
        let x = await getBudgetByDate(
          `${twoDigits(day.day)}/${twoDigits(day.monthIndex + 1)}/${day.year}`
        )
          .then((val) => val)
          .catch((e) => reject(e));
        budget.idBudgetGlobal = x.idBudgetGlobal;
        budget.budget += parseFloat(x.budget);
        budget.reste += parseFloat(x.reste);
      }

      resolve(budget);
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
      const budget = { idBudgetGlobal: "", budget: 0, reste: 0 };
      let z = 0;
      let y = 0;
      for (let x of all) {
        budget.idBudgetGlobal = x.idBudgetGlobal;
        z += x.budget;
        y += x.reste;
      }
      budget.budget = Number(z.toFixed(2));
      budget.reste = Number(y.toFixed(2));
      resolve(budget);
    } catch (e) {
      reject(e);
    }
  });

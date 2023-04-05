import { oneDigit, twoDigits } from "../../utils/functions";
import { BudgetGlobal } from "../model/budgetGlobalModel";
import { Budget } from "../model/budgetModel";
import { Depense } from "../model/depenseModel";
import { sequelize } from "../options";
const { JsonCalendar } = require("json-calendar");

export const getAllDepensesByDate = (date) =>
  new Promise((resolve, reject) => {
    try {
      let all = Depense.findAll({
        attributes: ["date", date],
      });
      resolve(
        all.map((el) => {
          return {
            id: el.dataValues.id,
            date: el.dataValues.date,
            comment: el.dataValues.comment,
            montant: el.dataValues.montant,
          };
        })
      );
    } catch (e) {
      reject(e);
    }
  });
export const getAllDepensesByWeek = (week) =>
  new Promise((resolve, reject) => {
    const weekDate = week.split("/");
    const calendar = new JsonCalendar({
      languageCode: "fr",
      monthIndex: parseInt(oneDigit(weekDate[1])) - 1,
      year: parseInt(oneDigit(weekDate[2])),
    });
    const weekTab = calendar.weeks[parseInt(oneDigit(weekDate[0]))];
    try {
      let all = [];
      for (let day of weekTab) {
        all = [
          ...all,
          ...getAllDepensesByDate(
            `${twoDigits(day.day)}/${twoDigits(day.monthIndex + 1)}/${day.year}`
          ),
        ];
      }
      resolve(
        all.map((el) => {
          return {
            id: el.dataValues.id,
            date: el.dataValues.date,
            comment: el.dataValues.comment,
            montant: el.dataValues.montant,
          };
        })
      );
    } catch (e) {
      reject(e);
    }
  });

export const getAllDepensesByMonth = (month) =>
  new Promise((resolve, reject) => {
    const monthDate = month.split("/");
    const calendar = new JsonCalendar({
      languageCode: "fr",
      monthIndex: parseInt(oneDigit(monthDate[0])) - 1,
      year: parseInt(oneDigit(monthDate[1])),
    });
    const weekTab = calendar.weeks;
    try {
      let all = [];
      for (let week of weekTab) {
        for (let day of week) {
          if (day.monthIndex === parseInt(oneDigit(monthDate[0])) - 1) {
            all = [
              ...all,
              ...getAllDepensesByDate(
                `${twoDigits(day.day)}/${twoDigits(day.monthIndex + 1)}/${
                  day.year
                }`
              ),
            ];
          }
        }
      }
      resolve(
        all.map((el) => {
          return {
            id: el.dataValues.id,
            date: el.dataValues.date,
            comment: el.dataValues.comment,
            montant: el.dataValues.montant,
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
    const budget = parseFloat(values.budget).toFixed(2);
    const nbJours = dateDiffrence(values.dateDebut, values.dateFin) + 1;
    const joursTab = getDatesInRange(values.dateDebut, values.dateFin);
    try {
      const added = await BudgetGlobal.create(values, { transaction: t });
      for (let jour of joursTab) {
        let el = await Budget.create(
          {
            idBudgetGlobal: added.dataValues.id,
            date: jour,
            budget: budget / nbJours,
            reste: budget / nbJours,
          },
          { transaction: t }
        );
      }
      await t.commit();
      resolve({
        id: added.dataValues.id,
        budget: added.dataValues.budget,
        dateDebut: added.dataValues.dateDebut,
        dateFin: added.dataValues.dateFin,
        reste: added.dataValues.reste,
      });
    } catch (e) {
      await t.rollback();
      reject(e);
    }
  });

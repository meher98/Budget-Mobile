import { Cash } from "../model/cashModel";

export const getCash = async (date, type) =>
  new Promise(async (resolve, reject) => {
    try {
      let cash = await Cash.findOne({ where: { date: date, type: type } });
      resolve(cash);
    } catch (e) {
      reject(e);
    }
  });
export const addOrUpdateCash = async (date, type, val) =>
  new Promise(async (resolve, reject) => {
    try {
      let cash = await Cash.findOne({ where: { date: date, type: type } });
      if (cash) {
        cash.cash = Number(parseFloat(val).toFixed(2));
        await cash.save();
        resolve(cash);
      } else {
        cash = await Cash.create({
          date: date,
          type: type,
          cash: parseFloat(val),
        });
        resolve(cash);
      }
    } catch (e) {
      reject(e);
    }
  });

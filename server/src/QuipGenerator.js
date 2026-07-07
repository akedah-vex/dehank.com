import { quipsDatabase } from "./Constants.js";
import { readDatabase } from "./util/DatabaseUtil.js";

export const getQuip = async (response) => {
  const quips = await readDatabase(quipsDatabase).quips;
  response.json({ quip: quips[Math.floor(Math.random() * quips.length)] });
};

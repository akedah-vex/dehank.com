import fs from "fs";
import { usersDatabase } from "../Constants.js";

const readDatabase = (database) => {
  return new Promise((resolve, reject) => {
    // update items in db with data object
    try {
      fs.readFile(database, "utf8", (error, data) => {
        const database = JSON.parse(data);
        return resolve(database); // return database
      });
    } catch (e) {
      console.error(e);
      reject(e);
    }
    console.log("database read into memory...");
  });
};

const writeDatabase = (database, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(database, JSON.stringify(data, null, 2), "utf8", (e) => {
      if (e) {
        console.error("error writing file:", e);
        return reject(false);
      }
      console.log("database successfully written");
      return resolve(true);
    });
  });
};

export { writeDatabase, readDatabase };

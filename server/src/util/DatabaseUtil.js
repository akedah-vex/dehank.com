import fs from "fs";
import { usersDatabase } from "../Constants.js";

const readDatabase = (database) => {
  return new Promise((resolve, reject) => {
    fs.readFile(database, "utf8", (error, data) => {
      if (error) {
        console.error(`Failed to read database file: `, error.message);
        return reject(error);
      }
      try {
        const parsed = JSON.parse(data);
        resolve(parsed);
      } catch (parseError) {
        console.error(`Failed to parse database JSON:`, parseError.message);
        reject(parseError);
      }
    });
  });
};

const writeDatabase = (database, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(database, JSON.stringify(data, null, 2), "utf8", (error) => {
      if (error) {
        console.error(
          `Failed to write database file at ${database}:`,
          error.message,
        );
        return reject(error);
      }
      console.log("Database successfully written");
      resolve();
    });
  });
};

export { writeDatabase, readDatabase };

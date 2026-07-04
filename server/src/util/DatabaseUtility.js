import fs from 'fs'
import { databaseFilePath, transformationMap } from '../Constants.js';

const decapitalize = (string) => {
    if (!string) return "";

    string = string.split("");
    string[0] = string[0].toLowerCase();

    return string.join("");
};

const capitalize = (string) => {
    if (!string) return "";

    string = string.split("");
    string[0] = string[0].toUpperCase();

    return string.join("");
};

const readDatabase = () => {
    return new Promise((resolve, reject) => {
        // update items in db with data object
        try {
            fs.readFile(databaseFilePath, "utf8", (error, data) => {
                const database = JSON.parse(data);
                return resolve(database); // return database
            });
        } catch (e) {
            console.error(e);
            reject(e);
        }
    });
}

const writeDatabase = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(databaseFilePath, JSON.stringify(data, null, 2), "utf8", (e) => {
            if (e) {
                console.error("error writing file:", e)
                return reject(false);
            }
            console.log("file written successfully");
            return resolve(true);
        })
    });
}

// assumes a string
// this function is designed specifically
// to clean the keys of data exported from
// FreshService and our spreadsheets
const cleanKey = (key) => {
    // if (!key.includes(" ")) return;

    let cleanKey = decapitalize(key);

    cleanKey = cleanKey.split("(").join("");
    cleanKey = cleanKey.split(")").join("");

    // capitalize every word but the first one
    cleanKey = cleanKey.split("");
    for (let i = 0; i < cleanKey.length; i++) {
        if (cleanKey[i] === " " && cleanKey[i + 1] !== null) {
            if (cleanKey[i + 1] === "-") continue;

            cleanKey[i + 1] = capitalize(cleanKey[i + 1]);
        }
    }
    cleanKey = cleanKey.join("");

    cleanKey = cleanKey.split("-").join("");
    cleanKey = cleanKey.split(" ").join("");
    return cleanKey;
};

const normalize = (database) => {
    return new Promise((res, rej) => {
        const { items } = database;

        let itemId = 0;
        for (let item of items) {
            itemId++;

            for (let key in item) {

                // if value is empty quotes, replace with real empty string
                if (item[key] === '""') {
                    item[key] = "";
                }

                // run key cleaning algo on the key of the item
                // as a string, then use this key to store the value
                // as a new entry into item.
                // delete the old entry
                // if clean key is sound, this should work?
                let cleanedKey = cleanKey(key.toString());
                item[cleanedKey] = item[key];
                delete item[key];

            }
        }
        res(database);
    });
};

const applyTransformationLayer = (database) => {
    console.log("applying transformation layer to keys")
}

export { writeDatabase, readDatabase, normalize, applyTransformationLayer }
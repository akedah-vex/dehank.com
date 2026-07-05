import bcrypt from "bcryptjs";
import fs from "fs";
import jwt from "jsonwebtoken";

import { usersDatabase } from "./Constants.js";
import { readDatabase } from "./util/DatabaseUtility.js";

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log("Received login request for username:", username);

  if (!username || !password) {
    console.log("Missing username or password in request body");
    return res
      .status(400)
      .json({ message: "Please enter both username and password." });
  }

  const database = await readDatabase(usersDatabase);
  for (let user in database.users) {
    if (username === database.users[user].username) {
      // match
      console.log("account match, cross ref password");
      const hashedPassword = database.users[user].password;

      const result = await bcrypt.compare(password, hashedPassword);

      if (result) {
        return true;
      } else {
        return false;
      }
    }
  }
  console.log("no match found for:", username);
  return res.json({ message: "faliure" });
};

const register = async (username, password) => {
  let user = {
    username,
    password: "",
    role: "user",
    createdAt: Date.now(),
  };

  const salty = 12;
  const passwordHash = await bcrypt.hash(password, salty);

  user.password = passwordHash;

  return user;
};

const recover = (req, res) => {};

export { login, register, recover };

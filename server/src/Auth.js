import bcrypt from "bcryptjs";
import fs from "fs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import crypto from "crypto";
import { usersDatabase } from "./Constants.js";
import { readDatabase, writeDatabase } from "./util/DatabaseUtility.js";

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log("Received login request for username:", username);

  if (!username || !password) {
    console.log("Missing username or password in request bodyy");
    return res
      .status(400)
      .json({ message: "Please enter both username and password." });
  }

  const data = await readDatabase(usersDatabase);
  for (let user in data.users) {
    if (username === data.users[user].username) {
      const hashedPassword = data.users[user].password;
      const match = await bcrypt.compare(password, hashedPassword);

      if (match) {
        const token = jwt.sign(
          {
            username,
            id: hash(username),
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          },
        );

        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({ success: true, username, message: "user logged in" });
      }
    }
  }
  console.log("no match found for:", username);
  return res.json({ success: false, message: "user does not exist" });
};

const hash = (input) => {
  return crypto.createHash("sha256").update(input, "utf8").digest("hex");
};

const register = async (req, res) => {
  // check if username exists already
  const { username, password } = req.body;

  const data = await readDatabase(usersDatabase);

  for (let user in data.users) {
    console.log("yep");
    console.log(data.users[user].username);
    if (username === data.users[user].username) {
      // we have a match, exit
      console.log("match, cant create user");
      return res.json({ success: false, message: "user already exists" });
    }
  }

  const user = await createUser(username, password);
  data.users.push(user);
  let result = await writeDatabase(usersDatabase, data);

  if (result) {
    console.log(`user '${username}' created at:`, Date.now());
  }

  return res.json({ success: true, message: "user registered" });
};

const createUser = async (username, password) => {
  const salty = 12;

  let user = {
    username,
    password: await bcrypt.hash(password, salty),
    id: hash(username),
    role: "user",
    createdAt: Date.now(),
  };

  return user;
};

const usernameExists = (username) => {
  const data = readDatabase(usersDatabase);

  return false;
};

const recover = (req, res) => {};

export { login, createUser, recover, register };

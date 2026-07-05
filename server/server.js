import express from "express";
import cors from "cors";
import fs from "fs";
import multer from "multer";
import { readDatabase, writeDatabase } from "./src/util/DatabaseUtility.js";
import { login, register } from "./src/Auth.js";
import { configFilePath, usersDatabase } from "./src/Constants.js";
const server = express();
const port = 3004;
const dataPath = "../database/db.json";

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (request, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (request, file, cb) => {
    // check for file type eventually, doing no checks now

    return cb(null, true);

    // const allowedTypes = ["text/csv", "application/vnd.ms-excel"];
    // // const extension = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    // const ext = allowedTypes.includes(path.extname(file.originalname).toLowerCase());
    // if (ext) {
    //     return cb(null, true);
    // }
    // cb(new Error("Only CSV files are allowed"));
  },
});
server.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// login auth post == form submission
server.post("/api/auth/login", async (req, res) => {
  console.log("/auth/login endpoint has been hit!");
  const result = await login(req, res);
  console.log("server: ", result);
  res.json({ result });
});

server.post("/api/auth/register", async (req, res) => {
  console.log("users endpoint hit");
  // console.log(req.body);
  let { username, password } = req.body;

  const user = await register(username, password);
  const database = await readDatabase(usersDatabase);
  database.users.push(user);

  let response = await writeDatabase(usersDatabase, database);
  if (response) {
    console.log(`user ${username} created at:`, Date.now());
  }
  return response;
});

server.get("/", (req, res) => {
  console.log("/ root endpoint hit");
});

server.get("/config", (request, response) => {
  // console.log("/config endpoint hit");
  fs.readFile(configFilePath, (err, data) => {
    const configFile = JSON.parse(data);
    response.json(configFile);
  });
});

// logic for creating a user
server.post("/users/create", (req, res) => {
  const { username, password } = req.body;
  console.log("Received user creation request for username:", username);
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log("Listening for api calls...");
});

import express from "express";
import cors from "cors";
import fs from "fs";
import multer from "multer";
import { readDatabase, writeDatabase } from "./src/util/DatabaseUtility.js";
import { login, createUser, register } from "./src/Auth.js";
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
  },
});
server.use(
  cors({
    origin: "https://dehank.com/",
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
  return await login(req, res);
});

server.post("/api/auth/register", async (req, res) => {
  console.log("/api/auth/register endpoint has been hit!");
  return await register(req, res);
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

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import fs from "fs";
import multer from "multer";
import { readDatabase, writeDatabase } from "./src/util/DatabaseUtil.js";
import { login, createUser, register } from "./src/Auth.js";
import { usersDatabase, endpoints, serverDetails } from "./src/Constants.js";
// import { getQuip } from "./src/QuipGenerator.js";

const server = express();
const port = 3004;
const dataPath = "../database/db.json";

const { API_AUTH_LOGIN, API_AUTH_REGISTER, API_QUIP } = endpoints;
const { API_PORT } = serverDetails;

// Set up multer for handling file uploads
// const storage = multer.diskStorage({
//   destination: (request, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (request, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({
//   storage,
//   fileFilter: (request, file, cb) => {
//     // check for file type eventually, doing no checks now

//     return cb(null, true);
//   },
// });
server.use(
  cors({
    origin: "https://localhost:3004/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// login auth post == form submission
server.post(API_AUTH_LOGIN, async (req, res) => {
  console.log("/auth/login endpoint has been hit!");
  return await login(req, res);
});

server.post(API_AUTH_REGISTER, async (req, res) => {
  console.log("/api/auth/register endpoint has been hit!");
  return await register(req, res);
});

server.post(API_QUIP, async (req, res) => {
  console.log("/api/quip endpoint has been hit!");
  return await getQuip(res);
});

server.listen(API_PORT, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log("Listening for api calls at:");
  for (let endpoint in endpoints) {
    console.log("-->", endpoints[endpoint]);
  }
});

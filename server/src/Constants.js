import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const usersDatabase = path.join(
  __dirname,
  "../../database/",
  "users.db.json",
);

export const endpoints = {
  API_AUTH_LOGIN: "/api/auth/login",
  API_AUTH_REGISTER: "/api/auth/register",
  API_QUIP: "/api/quip",
};

export const serverDetails = {
  API_PORT: 3004,
};

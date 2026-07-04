import axios from "axios";

import { baseURI } from "./baseURI";

const register = async ({ username, password }) => {
  if (!username || !password) {
    return false;
  }

  const credentials = {
    username,
    password,
  };

  const response = await axios
    .post(`${baseURI}/api/auth/register`, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .catch((err) => {
      console.error("Error during registration: ", err);
      return;
    });

  return response;
};

const login = async ({ username, password }) => {
  if (!username || !password) {
    return false;
  }

  const credentials = {
    username,
    password,
  };

  const res = await axios
    .post(`${baseURI}/api/auth/login`, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .catch((err) => {
      console.error("Error during login request:", err);

      return;
    });
  return res;
};

export { register as register };
export { login };

import axios from "axios";

const register = async ({ username, password }) => {
  if (!username || !password) {
    return false;
  }

  const credentials = {
    username,
    password,
  };

  const response = await axios
    .post("/api/auth/register", credentials, {
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

  const response = await axios
    .post("/api/auth/login", credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .catch((err) => {
      console.error("Error duringss login request:", err);

      return;
    });
  return response;
};

const getQuip = async () => {
  const response = await axios.post("/api/quip");
};

export { login, register };
export { getQuip };

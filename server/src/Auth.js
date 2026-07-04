import bcrypt from "bcryptjs";
import fs from "fs";
import jwt from "jsonwebtoken";

const dataPath = "../database/db.json";

const login = (req, res) => {
  const { username, password } = req.body;
  console.log("Received login request for username:", username);

  if (!username || !password) {
    console.log("Missing username or password in request body");
    return res
      .status(400)
      .json({ message: "Please enter both username and password." });
  }

  fs.readFile(dataPath, "utf8", (err, data) => {
    // async
    if (err) {
      console.error("Error reading user data:", err);
      return res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
    }
    // find user in question
    const users = JSON.parse(data).users;
    const user = users.find((u) => u.username === username);
    if (!user) {
      console.log("User not found:", username);
      return res.status(401).json({ message: "Invalid username or password." });
    }
    // compare password with hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).json({
          message: "An error occurred while processing your request.",
        });
      }
      if (!isMatch) {
        console.log("Password match for user:", username);
        // In a real application, you would generate a token here
        const payload = {
          name: user.username,
          role: user.role,
        };
        // const secretKey = process.env.JWT_SECRET;
        const secretKey = "secretSauce";
        const token = jwt.sign(payload, secretKey, { expiresIn: "3h" });
        // set up cookie
        res.cookie("token", token, {
          httpOnly: true, // prevent client side JS access
          secure: false, // not using https
          sameSite: "strict", // prevent CSRF attacks?
        });
        // all info to send back to client:
        return res.json({
          username: user.username,
          displayname: user.displayname,
          role: user.role,
          message: "Login successful!",
          token: token, // might not want to send token back?
          ...user,
        });
        // assign token to user in db??
      } else {
        console.log("Password mismatch for user:", username);
        return res
          .status(401)
          .json({ message: "Invalid username or password." });
      }
    });
  });
};

const register = (req, res) => {};

const recover = (req, res) => {};

export { login, register, recover };

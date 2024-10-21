import bcrypt from "bcrypt";
import pool from "../db.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(password, salt);
  return hash;
};

const register = async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;
    const hashedPassword = await hashPassword(password);
    console.log({ email, password, first_name, last_name, hashedPassword });

    const response = await pool.query(
      "INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) returning *",
      [email, hashedPassword, first_name, last_name]
    );

    const token = await jwt.sign(
      { user: response.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Server Error");
  }
};

const login = async (req, res) => {
  // Compare the password with the entered password using bcrypt.compareSync(password, hashedPassword)
  try {
    const { email, password } = req.body;

    // Check if the email exists in the database
    const response = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (response.rows.length === 0) {
      res.status(401).json("Incorrect Email or Password");
    }

    const isValidPassword = await bcrypt.compareSync(
      password,
      response.rows[0].password
    );

    if (!isValidPassword) {
      res.status(401).json("Incorrect Email or Password");
    }

    const token = await jwt.sign(
      { user: response.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Server Error");
  }
};

export { register, login };

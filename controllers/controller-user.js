const knex = require("knex")(require("../knexfile"));
require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const {
    first_name,
    last_name,
    phone,
    age,
    address,
    fav_book,
    email,
    password,
  } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).send("Please enter the required fields.");
  }

  const hashedPassword = bcrypt.hashSync(password, 6);

  const newUser = {
    first_name,
    last_name,
    phone,
    age,
    address,
    fav_book,
    email,
    role: "standard user",
    password: hashedPassword,
  };

  try {
    await knex("users").insert(newUser);
    const users = await knex("users").where("email", newUser.email);
    const user = users[0];
    const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(201).json({ newUser, token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed registration" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Please enter the required fields");
  }

  try {
    const user = await knex("users").where({ email: email }).first();

    const passwordCorrect = bcrypt.compareSync(password, user.password);

    if (!passwordCorrect) {
      return res.status(400).send("Invalid password");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Failed login" });
  }
};

const profile = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }

  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    return res.status(200).send(decoded);

    const user = await knex("users").where({ id: decoded.id }).first();

    res.status(200).json(user);
  } catch (error) {
    return res.status(401).send("Invalid auth token");
  }
};

module.exports = { register, login, profile };

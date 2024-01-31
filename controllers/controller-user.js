const knex = require("knex")(require("../knexfile"));
require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  console.log(req.body);
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
    return res.status(400).send("Please enter the requirrrrred fields.");
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

  console.log(req.body);

  try {
    await knex("users").insert(newUser);
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed registration" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  if (!email || !password) {
    return res.status(400).send("Please enter the required fields");
  }

  try {
    const user = await knex("users").where({ email: email }).first();

    const passwordCorrect = bcrypt.compareSync(password, user.password);
    console.log(passwordCorrect);

    if (!passwordCorrect) {
      return res.status(400).send("Invalid password");
    }
    console.log("here");

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
  // If there is no auth header provided
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }

  console.log(req.headers.authorization);
  // THIS HOW WE GET THE KEY
  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1]; // GET THE TOKEN

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

    // Respond with the appropriate user data
    const user = await knex("users").where({ id: decoded.id }).first();

    res.json(user);
  } catch (error) {
    return res.status(401).send("Invalid auth token");
  }
};

module.exports = { register, login, profile };

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const SERVER_PORT = process.env.PORT;
const SERVER_API_URL = process.env.API_URL;

const bookRoutes = require("./routes/book-route");
const listRoutes = require("./routes/list-route");
const homepageRoutes = require("./routes/homepage-route");
const questionnaireRoutes = require("./routes/questionnaire-route");

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/letterbooks/book", bookRoutes);
app.use("/letterbooks/list", listRoutes);
// app.use("/letterbooks/homepage", homepageRoutes);
// app.use("/letterbooks/questionnaire", questionnaireRoutes);

app.listen(
  SERVER_PORT,
  console.log(`Server has been started at ${SERVER_API_URL}:${SERVER_PORT}`)
);

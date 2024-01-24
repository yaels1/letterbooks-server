const booksData = require("../seed-data/books-data");
const authorsData = require("../seed-data/authors-data");
const themesData = require("../seed-data/themes-data");

exports.seed = async function (knex) {
  await knex("authors").del();
  await knex("themes").del();
  await knex("books").del();
  await knex("books").insert(booksData);
  await knex("authors").insert(authorsData);
  await knex("themes").insert(themesData);
};

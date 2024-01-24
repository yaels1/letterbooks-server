const booksData = require("../seed-data/books-data");
const authorsData = require("../seed-data/authors-data");
const themesData = require("../seed-data/themes-data");
const bookThemesData = require("../seed-data/theme-book-data");

exports.seed = async function (knex) {
  await knex("bookThemes").del();
  await knex("authors").del();
  await knex("themes").del();
  await knex("books").del();
  await knex("books").insert(booksData);
  await knex("authors").insert(authorsData);
  await knex("themes").insert(themesData);
  await knex("bookThemes").insert(bookThemesData);
};

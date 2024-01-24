const booksData = require("../seed-data/books-data");
const authorsData = require("../seed-data/authors-data");
const themesData = require("../seed-data/themes-data");
const bookThemesData = require("../seed-data/theme-book-data");

exports.seed = async function (knex) {
  await knex("book_theme").del();
  await knex("book").del();
  await knex("author").del();
  await knex("theme").del();
  await knex("author").insert(authorsData);
  await knex("book").insert(booksData);
  await knex("theme").insert(themesData);
  await knex("book_theme").insert(bookThemesData);
};

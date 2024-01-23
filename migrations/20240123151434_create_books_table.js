/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("books", (table) => {
      table.increments("book_id").primary();
      table.integer("author_id").notNullable();
      table.integer("theme_id").notNullable();
      table.string("title").notNullable();
      table.integer("page_number").notNullable();
      table.string("description").notNullable;
      table.string("img").notNullable;
    })
    .createTable("authors", (table) => {
      table.increments("author_id").primary();
      table.string("name").notNullable();
    })
    .createTable("themes", (table) => {
      table.increments("theme_id").primary();
      table.string("theme").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};

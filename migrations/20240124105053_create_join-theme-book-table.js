/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("bookTheme", (table) => {
    table.increments("id").primary();
    table
      .integer("book_id")
      .unsigned()
      .references("book.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("theme_id")
      .unsigned()
      .references("theme.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("bookTheme");
};

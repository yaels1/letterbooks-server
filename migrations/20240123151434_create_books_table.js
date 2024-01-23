/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("author", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
    })
    .createTable("theme", (table) => {
      table.increments("id").primary();
      table.boolean("fiction").notNullable();
      table.string("name").notNullable();
    })
    .createTable("book", (table) => {
      table.increments("id").primary();
      table
        .integer("author_id")
        .unsigned()
        .references("author.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("theme_id")
        .unsigned()
        .references("theme.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("title").notNullable();
      table.integer("page_number").notNullable();
      table.string("description").notNullable;
      table.string("img").notNullable;
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("book").dropTable("theme").dropTable("author");
};

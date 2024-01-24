/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("book", (table) => {
    table.increments("id").primary();
    table
      .integer("author_id")
      .unsigned()
      .references("author.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("title").notNullable();
    table.integer("pages").notNullable();
    table.string("summary").notNullable;
    table.string("image").notNullable;
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("book");
};

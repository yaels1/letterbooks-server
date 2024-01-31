/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.string("phone");
    table.string("age");
    table.string("address");
    table.string("fav_book");
    table.string("role");
  });
};
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};

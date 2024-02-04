const knex = require("knex")(require("../knexfile"));
require("dotenv").config();

const addUserReadBook = async (req, res) => {
  try {
    await knex("user_read_book").insert(req.body);

    res.status(201).json(req.body);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const readBookData = async (req, res) => {
  const readBookList = await knex("user_read_book")
    .where("user_id", req.params.userId)
    .join("book", "user_read_book.book_id", "=", "book.id")
    .select(
      "book.id",
      "book.title",
      "book.pages",
      "book.summary",
      "book.image"
    );

  readBookList.forEach((book) => {
    book.image = `${process.env.API_URL}:${process.env.PORT}/${book.image}`;
  });

  res.json(readBookList);
};

const addUserWishlistBook = async (req, res) => {
  try {
    await knex("user_wishlist_book").insert(req.body);

    res.status(201).json(req.body);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const wishlistBookData = async (req, res) => {
  const wishlistBookList = await knex("user_wishlist_book")
    .where("user_id", req.params.userId)
    .join("book", "user_wishlist_book.book_id", "=", "book.id")
    .select(
      "book.id",
      "book.title",
      "book.pages",
      "book.summary",
      "book.image"
    );

  wishlistBookList.forEach((book) => {
    book.image = `${process.env.API_URL}:${process.env.PORT}/${book.image}`;
  });

  res.json(wishlistBookList);
};

module.exports = {
  addUserReadBook,
  readBookData,
  addUserWishlistBook,
  wishlistBookData,
};

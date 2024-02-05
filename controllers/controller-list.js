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
    .join("book_theme", "book.id", "book_theme.book_id")
    .join("theme", "theme.id", "book_theme.theme_id")
    .select(
      "book.id",
      "book.title",
      "book.pages",
      "book.summary",
      "book.image",
      "theme.name"
    );

  const bookMap = new Map();

  readBookList.forEach((pair) => {
    if (bookMap.has(pair.id)) {
      if (pair.name && !bookMap.get(pair.id).themes.includes(pair.name)) {
        bookMap.get(pair.id).themes.push(pair.name);
      }
    } else {
      let newbook = {
        id: pair.id,
        title: pair.title,
        pages: pair.pages,
        summary: pair.summary,
        image: pair.image,
        themes: pair.name ? [pair.name] : [],
      };
      bookMap.set(pair.id, newbook);
    }
  });

  const newReadBookList = Array.from(bookMap.values()).sort((a, b) => {
    return a.id - b.id;
  });

  newReadBookList.forEach((book) => {
    book.image = `${process.env.API_URL}:${process.env.PORT}/${book.image}`;
  });

  res.json(newReadBookList);
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
    .join("book_theme", "book.id", "book_theme.book_id")
    .join("theme", "theme.id", "book_theme.theme_id")
    .select(
      "book.id",
      "book.title",
      "book.pages",
      "book.summary",
      "book.image",
      "theme.name"
    );

  const wishbookMap = new Map();

  wishlistBookList.forEach((pair) => {
    if (wishbookMap.has(pair.id)) {
      if (pair.name && !wishbookMap.get(pair.id).themes.includes(pair.name)) {
        wishbookMap.get(pair.id).themes.push(pair.name);
      }
    } else {
      let newwishbook = {
        id: pair.id,
        title: pair.title,
        pages: pair.pages,
        summary: pair.summary,
        image: pair.image,
        themes: pair.name ? [pair.name] : [],
      };
      wishbookMap.set(pair.id, newwishbook);
    }
  });

  const newWishlistBookList = Array.from(wishbookMap.values()).sort((a, b) => {
    return a.id - b.id;
  });

  newWishlistBookList.forEach((book) => {
    book.image = `${process.env.API_URL}:${process.env.PORT}/${book.image}`;
  });

  res.json(newWishlistBookList);
};

module.exports = {
  addUserReadBook,
  readBookData,
  addUserWishlistBook,
  wishlistBookData,
};

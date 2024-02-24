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
    )
    .whereNotIn("book.id", function () {
      return this.select("book_id")
        .from("user_read_book")
        .where({ user_id: req.params.userId });
    });

  const wishbookMap = new Map();

  wishlistBookList.forEach((pair) => {
    if (wishbookMap.has(pair.id)) {
      if (pair.name && !wishbookMap.get(pair.id).themes.includes(pair.name)) {
        wishbookMap.get(pair.id).themes.push(pair.name);
      }
    } else {
      let newWishbook = {
        id: pair.id,
        title: pair.title,
        pages: pair.pages,
        summary: pair.summary,
        image: pair.image,
        themes: pair.name ? [pair.name] : [],
      };
      wishbookMap.set(pair.id, newWishbook);
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

// const deleteWishlistbook = async(req, res) = {

// try {
//   const wishlistRemoveBook = await knex("user_wishlist_book").where({book_id: req.params.id}).del();

//   if(wishlistRemoveBook===0){
//     return res.status(404).json({message: ` book ${req.params.id} is not found`});

//   }
//   res.status(204)
// } catch (error){
//   res.status(500).json({
//     message: `Unable to retrieve book data for ${req.params.id}`,
//   });
// }
// };
const deleteWishlistBook = async (req, res) => {
  try {
    const wishlistRemoveBook = await knex("user_wishlist_book")
      .where({ book_id: req.params.id })
      .del();

    if (wishlistRemoveBook === 0) {
      return res
        .status(404)
        .json({ message: ` book ${req.params.id} is not found` });
    }

    // No Content response
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve book data for book with ID ${req.params.id}`,
    });
  }
};

const addUserRecsBook = async (req, res) => {
  try {
    const { user_id, books } = req.body;
    const recommendedBooks = books.map((book) => {
      return {
        book_id: book.id,
        user_id: user_id,
      };
    });

    await knex("user_recs_book").insert(recommendedBooks);

    res.status(201).json(req.body);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const recsBookData = async (req, res) => {
  const recsBookList = await knex("user_recs_book")
    .where("user_id", req.params.userId)
    .join("book", "user_recs_book.book_id", "=", "book.id")
    .join("book_theme", "book.id", "book_theme.book_id")
    .join("theme", "theme.id", "book_theme.theme_id")
    .select(
      "book.id",
      "book.title",
      "book.pages",
      "book.summary",
      "book.image",
      "theme.name"
    )
    .whereNotIn("book.id", function () {
      return this.select("book_id")
        .from("user_read_book")
        .where({ user_id: req.params.userId });
    });

  const recsBookMap = new Map();

  recsBookList.forEach((pair) => {
    if (recsBookMap.has(pair.id)) {
      if (pair.name && !recsBookMap.get(pair.id).themes.includes(pair.name)) {
        recsBookMap.get(pair.id).themes.push(pair.name);
      }
    } else {
      let newRecsBook = {
        id: pair.id,
        title: pair.title,
        pages: pair.pages,
        summary: pair.summary,
        image: pair.image,
        themes: pair.name ? [pair.name] : [],
      };
      recsBookMap.set(pair.id, newRecsBook);
    }
  });

  const newRecsBookList = Array.from(recsBookMap.values()).sort((a, b) => {
    return a.id - b.id;
  });

  newRecsBookList.forEach((book) => {
    book.image = `${process.env.API_URL}:${process.env.PORT}/${book.image}`;
  });

  res.json(newRecsBookList);
};

module.exports = {
  addUserReadBook,
  readBookData,
  addUserWishlistBook,
  wishlistBookData,
  addUserRecsBook,
  recsBookData,
};

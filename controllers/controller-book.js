const knex = require("knex")(require("../knexfile"));
require("dotenv").config();

const bookData = async (_req, res) => {
  try {
    const getBook = await knex("book")
      .join("author", "author.id", "book.author_id")
      .select(
        "book.id",
        "book.title",
        "book.pages",
        "book.summary",
        "book.image",
        "author.name"
      );

    getBook.forEach((book) => {
      if (book.image) {
        book.image = `${process.env.API_URL}:${process.env.PORT}/${book.image}`;
      }
    });

    let bookThemes = [];
    for (const book of getBook) {
      const themes = await knex("theme")
        .select("theme.name", "fiction")
        .join("book_theme", "theme.id", "book_theme.theme_id")
        .where("book_theme.book_id", book.id);

      console.log(book);

      bookThemes.push({
        book_id: book.id,
        themes: themes.map((theme) => theme.name),
        fiction: Boolean(themes[0].fiction),
      });
    }

    const bookAll = getBook.map((book) => {
      const matchingBook = bookThemes.find((item) => item.book_id === book.id);
      return {
        ...book,
        themes: matchingBook ? matchingBook.themes : [],
        fiction: matchingBook?.fiction,
      };
    });

    res.status(200).json(bookAll);
  } catch (error) {
    res.status(400).send(`Error retrieving book: ${error}`);
    console.error(error);
  }
};

const singleBook = async (req, res) => {
  // book data
  try {
    const singleBookData = await knex("book")
      .join("author", "author.id", "book.author_id")
      .where({ "book.id": req.params.id })
      .first()
      .select(
        "book.title",
        "book.pages",
        "book.summary",
        "book.image",
        "author.name"
      );
    // image url
    singleBookData.image = `${process.env.API_URL}:${process.env.PORT}/${singleBookData.image}`;

    // book theme find
    const singleBookThemes = await knex("theme").whereIn(
      "id",
      knex("book_theme").select("theme_id").where("book_id", req.params.id)
    );
    // book theme list
    const singleBookThemeNames = singleBookThemes.map((theme) => theme.name);

    // add themes to book object
    const singleBookAll = { ...singleBookData, themes: singleBookThemeNames };

    if (!singleBookData)
      return res.status(404).send(`Book ID:${req.params.id} not found`);
    res.status(200).json(singleBookAll);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { bookData, singleBook };

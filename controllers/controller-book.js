const knex = require("knex")(require("../knexfile"));
require("dotenv").config();

const bookData = async (_req, res) => {
  try {
    const getBook = await knex("book");
    res.json(getBook);
  } catch (error) {
    res.status(400).send(`Error retrieving book: ${error}`);
    console.error(error);
  }
};

const singleBook = async (req, res) => {
  // book data
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
};

module.exports = { bookData, singleBook };

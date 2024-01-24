const knex = require("knex")(require("../knexfile"));

const bookData = async (_req, res) => {
  try {
    const getBook = await knex("book");
    res.json(getBook);
  } catch {
    error;
  }
  {
    res.status(400).send(`Error retrieving book: ${error}`);
    console.error(error);
  }
};

const singleBook = async (req, res) => {
  console.log(req.params.id);
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
  if (!singleBookData)
    return res.status(404).send(`Book ID:${req.params.id} not found`);
  res.status(200).json(singleBookData);

  const singleBookTheme = await knex("theme").whereIn(
    "id",
    knex("book_theme").select("theme_id").where("book_id", req.params.id)
  );
  console.log("hello");
  console.log(singleBookTheme);
};

module.exports = { bookData, singleBook };

// create another const that will add both of them together, bc have all the info needed

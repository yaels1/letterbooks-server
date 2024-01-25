const knex = require("knex")(require("../knexfile"));

const questionnaireQuestions = async (req, res) => {
  const questions = [
    {
      level: 0,
      question: "fiction or non-fiction?",
      answer: null,
      answered: false,
    },
    { level: 1, question: "how long?", answer: null, answered: false },
    { level: 2, question: "what theme?", answer: null, answered: false },
  ];

  res.json(questions);
};

const questionnaireAnswers = async (req, res) => {
  const answers = [
    {
      level: 0,
      question: "fiction or non-fiction?",
      answer: false,
      answered: true,
    },
  ];

  const allBooksData = await knex("book")
    .join("author", "author.id", "book.author_id")
    .select(
      "book.id as bookId", // Alias book.id to bookId
      "book.title",
      "book.pages",
      "book.summary",
      "book.image",
      "author.name"
    );

  //   console.log(allBooksData);

  // Fetch themes for all books along with necessary columns
  const allBooksThemes = await knex("book_theme")
    .select(
      "book_id as bookId", // Alias book_id to bookId
      "theme.id as themeId",
      "theme.name",
      "theme.fiction"
    )
    .whereIn(
      "book_id",
      allBooksData.map((book) => book.bookId)
    )
    .join("theme", "theme.id", "book_theme.theme_id");

  // Map theme names to each book
  const allBooksThemeNames = allBooksData.map((book) => {
    const bookThemes = allBooksThemes
      .filter((theme) => theme.bookId === book.bookId)
      .map((theme) => ({
        themeId: theme.themeId,
        name: theme.name,
        fiction: theme.fiction,
      }));

    return { ...book, themes: bookThemes };
  });

  console.log(allBooksThemeNames[0]);
  let filteredBookData = null;

  if (answers[0].answer) {
    filteredBookData = allBooksThemeNames.filter((book) => {
      return book.themes[0].fiction === 1;
    });
  } else {
    filteredBookData = allBooksThemeNames.filter((book) => {
      return book.themes[0].fiction === 0;
    });
  }

  res.json(filteredBookData);
};

module.exports = { questionnaireQuestions, questionnaireAnswers };

// fiction not fiction
// options of length
// theme from drop down list
// in front end  axios.get  map each question to something jsx
// each thing that is mapped will have a form, when submitted,
// answer and answered boolean will have things
// req.body[0].answer for level 0 question

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
  //   console.log(allBooksThemeNames);

  const answers = req.body;

  //   console.log(allBooksThemeNames[0]);
  let bookData = allBooksThemeNames;

  // fiction. level 0
  if (answers[0].answered) {
    if (answers[0].answer) {
      bookData = bookData.filter((book) => {
        return book.themes[0].fiction === 1;
      });
    } else {
      bookData = bookData.filter((book) => {
        return book.themes[0].fiction === 0;
      });
    }
  }

  //   how long. level 1
  if (answers[1].answered) {
    if (answers[1].answer === "small") {
      bookData = bookData.filter((book) => {
        return book.pages < 500;
      });
    } else if (answers[1].answer === "medium") {
      bookData = bookData.filter((book) => {
        return book.pages > 500 && book.themes[0].pages < 800;
      });
    } else if (answers[1].answer === "large") {
      bookData = bookData.filter((book) => {
        return book.pages > 800;
      });
    }
  }

  //   theme.  level 2
  if (answers[2].answered) {
    bookData = bookData.filter((book) => {
      return book.themes.find((theme) => theme.name === answers[2].answer);
    });
  }

  res.json(bookData);
};

module.exports = { questionnaireQuestions, questionnaireAnswers };

// fiction not fiction
// options of length
// theme from drop down list
// in front end  axios.get  map each question to something jsx
// each thing that is mapped will have a form, when submitted,
// answer and answered boolean will have things
// req.body[0].answer for level 0 question

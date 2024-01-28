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

module.exports = { questionnaireQuestions };

// fiction not fiction
// options of length
// theme from drop down list
// in front end  axios.get  map each question to something jsx
// each thing that is mapped will have a form, when submitted,
// answer and answered boolean will have things
// req.body[0].answer for level 0 question

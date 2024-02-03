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

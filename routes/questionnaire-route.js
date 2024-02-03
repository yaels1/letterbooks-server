const express = require("express");
const router = express.Router();
const controllerQuestionnaire = require("../controllers/controller-questionnaire");

router.route("/").get(controllerQuestionnaire.questionnaireQuestions);

module.exports = router;

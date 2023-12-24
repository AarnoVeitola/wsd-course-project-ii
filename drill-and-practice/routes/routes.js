import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";
import * as userController from "./controllers/userController.js";
import * as optionController from "./controllers/optionController.js";
import * as quizController from "./controllers/quizController.js";
import * as questionApi from "./apis/questionApi.js";

const router = new Router();

router.get("/", mainController.showMain);
// Topics
router.get("/topics", topicController.showTopics);
router.post("/topics", topicController.addTopic);
router.post("/topics/:id/delete", topicController.deleteTopic);
// Questions
router.get("/topics/:id", questionController.showQuestions);
router.post("/topics/:id/questions", questionController.addQuestion);
router.post("/topics/:tId/questions/:qId/delete", questionController.deleteQuestion);

// Answer options
router.get("/topics/:id/questions/:qId", optionController.showOptions);
router.post("/topics/:id/questions/:qId/options", optionController.addOption);
router.post("/topics/:id/questions/:qId/options/:oId/delete", optionController.deleteOption);
// Quiz
router.get("/quiz", quizController.showQuizTopics);
router.get("/quiz/:tId", quizController.chooseRandomQuestion);
router.get("/quiz/:tId/questions/:qId", quizController.showAnswerOptions);
router.post("/quiz/:tId/questions/:qId/options/:oId", quizController.checkAnswer);
router.get("/quiz/:tId/questions/:qId/correct", quizController.showCorrect);
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.showIncorrect);
// Registration
router.get("/auth/register", userController.showRegistrationForm);
router.post("/auth/register", userController.registerUser);
// Login
router.get("/auth/login", userController.showLoginForm);
router.post("/auth/login", userController.processLogin);
// API
router.get("/api/questions/random", questionApi.getQuestionAndOptions);
router.post("/api/questions/answer", questionApi.checkAnswer);

export { router };

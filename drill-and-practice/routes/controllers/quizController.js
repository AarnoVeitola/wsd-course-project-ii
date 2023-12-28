import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";
import * as answerService from "../../services/answerService.js";

const showQuizTopics = async ({ render }) => {
    render("quiz.eta", { 
        topics: await topicService.listTopics(), 
    });
};

const chooseRandomQuestion = async ({ render, params, response }) => {
    const questions = await questionService.listQuestionsByTopic(params.tId);
    if (!questions || questions.length === 0) {
        render("emptyQuiz.eta");
    } else {
        const question = questions[Math.floor(Math.random() * questions.length)];
        response.redirect(`/quiz/${ params.tId }/questions/${ question.id }`);
    }
};

const showAnswerOptions = async ({ params, render }) => {
    const question = await questionService.findQuestion(params.qId);
    console.log(question);
    const options = await optionService.listOptions(params.qId);
    console.log(options);

    render("quizAnswers.eta", {
        options: options,
        question_id: params.qId,
        topic_id: params.tId,
        question_text: question[0].question_text,
    });
};

const checkAnswer = async ({ user, params, response }) => {
    const option = await optionService.findOption(params.oId);
    
    await answerService.addAnswer(user.id, params.qId, params.oId);

    if (option[0].is_correct) {
        response.redirect(`/quiz/${ params.tId }/questions/${ params.qId }/correct`);
    } else {
        response.redirect(`/quiz/${ params.tId }/questions/${ params.qId }/incorrect`);
    }
};

const showCorrect = ({ render, params }) => {
    render("quizResult.eta", {
        result: "Correct!",
        topic_id: params.tId,
    });
};

const showIncorrect = async ({ render, params }) => {
    const correct = await optionService.findCorrectOption(params.qId);

    render("quizResult.eta", {
        result: "Incorrect!",
        topic_id: params.tId,
        option_text: correct[0].option_text,
    });
};

export { 
    showQuizTopics,
    chooseRandomQuestion, 
    showAnswerOptions, 
    checkAnswer, 
    showCorrect, 
    showIncorrect 
};
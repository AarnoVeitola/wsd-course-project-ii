import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
    question_text: [validasaur.required],
};

const getQuestionData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return { question_text: params.get("question_text") }; 
};

const addQuestion = async ({ user, params, request, response, render }) => {
    const questionData = await getQuestionData(request);

    const [passes, errors] = await validasaur.validate(
        questionData,
        questionValidationRules
    );
    
    if (!passes) {
        console.log(errors);
        questionData.validationErrors = errors;
        questionData.questions = await questionService.listQuestionsByTopic(params.id);
        questionData.topic_id = params.id;
        render("questions.eta", questionData);
    } else {
        await questionService.addQuestion(
            user.id,
            params.id,
            questionData.question_text
        );

        response.redirect(`/topics/${ params.id }`);
    }
};

const showQuestions = async ({ params, render }) => {
    render("questions.eta", { 
        questions: await questionService.listQuestionsByTopic(params.id), 
        topic_id: params.id, 
        question_text: "",
    });
};

const deleteQuestion = async ({ params, response }) => {
    await questionService.deleteQuestion(params.qId);
    response.redirect(`/topics/${ params.tId }`);
};

export { showQuestions, addQuestion, deleteQuestion };
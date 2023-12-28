import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";
import * as answerService from "../../services/answerService.js";
import { validasaur } from "../../deps.js";

const topicValidationRules = {
    name: [validasaur.required],
};

const getTopicData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return { name: params.get("name") };
};

const addTopic = async ({ render, request, response, user }) => {
    if (!user.admin) {
        response.redirect("/auth/login");
    }

    const topicData = await getTopicData(request);

    const [passes, errors] = await validasaur.validate(
        topicData, 
        topicValidationRules
    );
    
    if (!passes) {
        console.log(errors);
        topicData.validationErrors = errors;
        topicData.topics = await topicService.listTopics();
        topicData.isAdmin = user.admin;
        render("topics.eta", topicData);
    } else {
        await topicService.addTopic(
            user.id,
            topicData.name
        );

        response.redirect("/topics");
    }
};

const showTopics = async ({ render, user }) => {
    render("topics.eta", { 
        topics: await topicService.listTopics(), 
        isAdmin: user.admin,
        name: "",
    });
};

const deleteTopic = async ({ params, response, user }) => {
    if (user && user.admin) {
        const questions = await questionService.listQuestionsByTopic(params.id);

        for (const question of questions) {
            await answerService.deleteAnswersByQuestionId(question.id);
            await optionService.deleteOptionsByQuestionId(question.id);
            await questionService.deleteQuestion(question.id);
        }

        await topicService.deleteTopic(params.id);
    }
    response.redirect("/topics");
};

export { showTopics, addTopic, deleteTopic };
import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";
import * as answerService from "../../services/answerService.js";
import { validasaur } from "../../deps.js";

const optionValidationRules = {
    option_text: [validasaur.required],
};

const getOptionData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return { 
        option_text: params.get("option_text"),
        is_correct: params.get("is_correct") ? true : false,
    };
};

const addOption = async ({ render, params, request, response }) => {
    const optionData = await getOptionData(request);

    const [passes, errors] = await validasaur.validate(
        optionData,
        optionValidationRules
    );

    if (!passes) {
        console.log(errors);
        const rows = await questionService.findQuestion(params.qId);
        const question_text = rows[0].question_text;
        optionData.validationErrors = errors;
        optionData.options = await optionService.listOptions(params.qId);
        optionData.topic_id = params.id;
        optionData.question_id = params.qId;
        optionData.question_text = question_text;
        render("options.eta", optionData);
    } else {
        await optionService.addOption(
            params.qId,
            optionData.option_text,
            optionData.is_correct
        );
        
        response.redirect(`/topics/${ params.id }/questions/${ params.qId }`);
    }
};

const showOptions = async ({ params, render }) => {
    const rows = await questionService.findQuestion(params.qId);
    const question_text = rows[0].question_text;

    render("options.eta", { 
        options: await optionService.listOptions(params.qId),
        topic_id: params.id, 
        question_id: params.qId,
        question_text: question_text,
    });
};

const deleteOption = async ({ params, response }) => {
    await answerService.deleteAnswersByOptionId(params.oId);
    await optionService.deleteOption(params.oId);
    response.redirect(`/topics/${ params.id }/questions/${ params.qId }`);
};

export { showOptions, addOption, deleteOption };
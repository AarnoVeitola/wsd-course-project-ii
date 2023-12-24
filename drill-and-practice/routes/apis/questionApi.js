import { sql } from "../../database/database.js";

const getQuestionAndOptions = async ({ response }) => {
    const questions = await sql`SELECT * FROM questions`;
    const question = questions[Math.floor(Math.random() * questions.length)];
    
    if (!question) {
        response.body = {};
    } else {
        const options = await sql`SELECT id AS "optionId", option_text AS "optionText" FROM question_answer_options WHERE question_id = ${ question.id }`;

        response.body = { 
            questionId: question.id,
            questionText: question.question_text,
            answerOptions: options,
        };
    }
};

const checkAnswer = async ({ request, response }) => {
    const body = request.body({ type: "json" });
    const document = await body.value;

    const rows = await sql`SELECT * FROM question_answer_options WHERE id = ${ document.optionId } AND question_id = ${ document.questionId }`;
    response.body = { correct: rows[0].is_correct };
};  

export { getQuestionAndOptions, checkAnswer };
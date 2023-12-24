import { sql } from "../database/database.js";

const addAnswer = async (user_id, question_id, question_answer_option_id) => {
    await sql`INSERT INTO question_answers (
        user_id, 
        question_id, 
        question_answer_option_id
    ) VALUES (
        ${ user_id }, 
        ${ question_id }, 
        ${ question_answer_option_id }
    )`;
};

const deleteAnswersByQuestionId = async (question_id) => {
    await sql`DELETE FROM question_answers WHERE question_id = ${ question_id }`;
};

const deleteAnswersByOptionId = async (question_answer_option_id) => {
    await sql`DELETE FROM question_answers WHERE question_answer_option_id = ${ question_answer_option_id }`;
};

export { addAnswer, deleteAnswersByQuestionId, deleteAnswersByOptionId }
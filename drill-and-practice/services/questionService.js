import { sql } from "../database/database.js";

const addQuestion = async (user_id, topic_id, question_text) => {
    await sql`INSERT INTO questions (user_id, topic_id, question_text) VALUES (${ user_id }, ${topic_id}, ${question_text})`;
};

const listQuestionsByTopic = async (topic_id) => {
    return await sql`SELECT * FROM questions WHERE topic_id = ${ topic_id }`;
};

const findQuestion = async (id) => {
    return await sql`SELECT * FROM questions WHERE id = ${ id }`;
};

const deleteQuestion = async (id) => {
    await sql`DELETE FROM questions WHERE id = ${ id }`;
};

export { addQuestion, listQuestionsByTopic, findQuestion, deleteQuestion };
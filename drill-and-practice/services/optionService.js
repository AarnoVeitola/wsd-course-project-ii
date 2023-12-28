import { sql } from "../database/database.js";

const listOptions = async (question_id) => {
    return await sql`SELECT * FROM question_answer_options WHERE question_id = ${ question_id }`;
};

const addOption = async (question_id, option_text, is_correct) => {
    await sql`INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES (${ question_id }, ${ option_text }, ${ is_correct })`;
};

const deleteOptionsByQuestionId = async (question_id) => {
    await sql`DELETE FROM question_answer_options WHERE question_id = ${ question_id }`;
};

const findOption = async (id) => {
    return await sql`SELECT * FROM question_answer_options WHERE id = ${ id }`;
};

const findCorrectOption = async (question_id) => {
    return await sql`SELECT * FROM question_answer_options WHERE question_id = ${ question_id } AND is_correct = true`;
};

const deleteOption = async (id) => {
    await sql`DELETE FROM question_answer_options WHERE id = ${ id }`;
};


export {
    listOptions, 
    addOption, 
    deleteOptionsByQuestionId, 
    findOption, 
    findCorrectOption,
    deleteOption
};
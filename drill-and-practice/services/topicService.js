import { sql } from "../database/database.js";

const addTopic = async (user_id, name) => {
    await sql`INSERT INTO topics (user_id, name) VALUES (${ user_id }, ${ name })`;
};

const listTopics = async () => {
    return await sql`SELECT * FROM topics ORDER BY name ASC`;
};

const deleteTopic = async (id) => {
    await sql`DELETE FROM topics WHERE id = ${ id }`;
};

export { addTopic, listTopics, deleteTopic };
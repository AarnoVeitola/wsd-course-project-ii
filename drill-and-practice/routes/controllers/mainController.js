import { sql } from "../../database/database.js";


const showMain = async ({ render }) => {
  const topic_stats = await sql`SELECT COUNT(id) AS count FROM topics`;
  const question_stats = await sql`SELECT COUNT(id) AS count FROM questions`;
  const answer_stats = await sql`SELECT COUNT(id) AS count FROM question_answers`;

  render("main.eta", {
    topic_count: topic_stats[0].count,
    question_count: question_stats[0].count,
    answer_count: answer_stats[0].count,
  });
};

export { showMain };

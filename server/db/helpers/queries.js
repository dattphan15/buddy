const db = require('./config/database');

const addTodoItem = async (userId, title, description, due_date) => {
  const result = await db.query(
    'INSERT INTO todo_items (user_id, title, description, due_date) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, title, description, due_date]
  );
  return result.rows[0];
};

module.exports = {
  addTodoItem
};
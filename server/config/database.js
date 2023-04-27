const { Pool } = require('pg');
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

const query = (text, params) => pool.query(text, params);

const addTodoItem = async (userId, todoItem) => {
  const text = `
    INSERT INTO todos (user_id, item)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [userId, todoItem];
  
  try {
    const result = await query(text, values);
    return result.rows[0];
  } catch (error) {
    console.error('Err adding a new todo item:', error);
    throw error;
  }
};

module.exports = {
  query,
  addTodoItem,
};
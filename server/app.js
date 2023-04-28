const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();

const { db } = require('./config/database');
const { addTodoItem } = require('./db/helpers/queries');

app.use(cors());
app.use(express.json());

// API endpoint to add a new todo item
app.post('/todos', async (req, res) => {
  try {
    const { userId, title, description, completed, due_date } = req.body;
    const newTodo = await addTodoItem(userId, title, description, completed, due_date);
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error in POST /todos:', error);
    res.status(500).json({ error: 'An error occurred while adding the todo item.' });
  }
});


// Add more API endpoints here for other actions like listing, updating, and deleting


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

CREATE TABLE todo_items (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    due_date TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
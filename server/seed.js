require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

console.log('DB_URL:', process.env.DB_URL);

const db = new Pool({
  connectionString: process.env.DB_URL,
  searchPath: 'public',
});

const seed = async () => {
  try {
    const hashedPassword = await bcrypt.hash('password', 10);

    await db.query(
      `INSERT INTO public.users (username, email, password)
       VALUES ($1, $2, $3)`,
      ['Buddy', 'buddyuser@email.com', hashedPassword]
    );    

    console.log('User seeded successfully');
  } catch (error) {
    console.error('Error seeding user:', error);
  } finally {
    db.end();
  }
};

seed();

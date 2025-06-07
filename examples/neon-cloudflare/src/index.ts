import { Hono } from 'hono';
import { neon } from '@neondatabase/serverless';

type Bindings = {
  HYPERDRIVE: Hyperdrive;
};

const app = new Hono<{ Bindings: Bindings }>();

// Initialize database connection
app.use('*', async (c, next) => {
  // Use Hyperdrive connection string for faster database access
  const sql = neon(c.env.HYPERDRIVE.connectionString);
  c.set('sql', sql);
  await next();
});

// Create tables on first request
app.get('/setup', async (c) => {
  const sql = c.get('sql');
  
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT,
        user_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    return c.json({ message: 'Database tables created successfully' });
  } catch (error) {
    return c.json({ error: 'Failed to create tables', details: error.message }, 500);
  }
});

// Create a user
app.post('/users', async (c) => {
  const sql = c.get('sql');
  const { name, email } = await c.req.json();
  
  try {
    const result = await sql`
      INSERT INTO users (name, email)
      VALUES (${name}, ${email})
      RETURNING *
    `;
    
    return c.json(result[0]);
  } catch (error) {
    return c.json({ error: 'Failed to create user', details: error.message }, 500);
  }
});

// Get all users
app.get('/users', async (c) => {
  const sql = c.get('sql');
  
  try {
    const users = await sql`SELECT * FROM users ORDER BY created_at DESC`;
    return c.json(users);
  } catch (error) {
    return c.json({ error: 'Failed to fetch users', details: error.message }, 500);
  }
});

// Create a post
app.post('/posts', async (c) => {
  const sql = c.get('sql');
  const { title, content, user_id } = await c.req.json();
  
  try {
    const result = await sql`
      INSERT INTO posts (title, content, user_id)
      VALUES (${title}, ${content}, ${user_id})
      RETURNING *
    `;
    
    return c.json(result[0]);
  } catch (error) {
    return c.json({ error: 'Failed to create post', details: error.message }, 500);
  }
});

// Get all posts with user information
app.get('/posts', async (c) => {
  const sql = c.get('sql');
  
  try {
    const posts = await sql`
      SELECT p.*, u.name as user_name, u.email as user_email
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
    `;
    
    return c.json(posts);
  } catch (error) {
    return c.json({ error: 'Failed to fetch posts', details: error.message }, 500);
  }
});

// Health check endpoint
app.get('/', (c) => {
  return c.json({ 
    message: 'Neon PostgreSQL API with Cloudflare Workers',
    endpoints: {
      setup: 'POST /setup - Create database tables',
      users: 'GET/POST /users - Manage users',
      posts: 'GET/POST /posts - Manage posts'
    }
  });
});

export default app;
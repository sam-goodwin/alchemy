const express = require('express');
const { createClient } = require('redis');

const app = express();
const port = process.env.PORT || 3000;

// Redis client setup
const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6379;

const redisClient = createClient({
  url: `redis://${redisHost}:${redisPort}`
});

// Connect to Redis
(async () => {
  redisClient.on('error', (err) => console.log('Redis Client Error', err));
  await redisClient.connect();
  console.log('Connected to Redis');
})();

// Set up view count in Redis
async function incrementViewCount() {
  try {
    const count = await redisClient.incr('viewCount');
    return count;
  } catch (error) {
    console.error('Error incrementing view count:', error);
    return 'Error counting views';
  }
}

// Routes
app.get('/', async (req, res) => {
  const viewCount = await incrementViewCount();
  res.send(`
    <h1>Hello from Alchemy Docker Provider!</h1>
    <p>This page has been viewed ${viewCount} times.</p>
    <p>This app is running in a Docker container managed by Alchemy.</p>
  `);
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

import { promises as fs } from 'fs';
import path from 'path';

const port = Number(process.env.PORT) || 3000;

// Ensure data directory exists
const DATA_DIR = '/data';
const DATA_FILE = path.join(DATA_DIR, 'app-data.json');

// Initialize data directory
async function initializeDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    // Create initial data file if it doesn't exist
    try {
      await fs.access(DATA_FILE);
    } catch {
      await fs.writeFile(DATA_FILE, JSON.stringify({ 
        initialized: true, 
        timestamp: new Date().toISOString(),
        entries: []
      }, null, 2));
    }
  } catch (error) {
    console.error('Failed to initialize data directory:', error);
  }
}

// Helper function to read JSON data
async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return { entries: [] };
  }
}

// Helper function to write JSON data
async function writeData(data: any) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// Request handler
async function handleRequest(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const { pathname } = url;

  // Health check endpoint
  if (pathname === '/health' && req.method === 'GET') {
    return Response.json({ 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      app: process.env.APP_NAME || 'alchemy-fly-example',
      environment: process.env.NODE_ENV || 'development'
    });
  }

  // Root endpoint
  if (pathname === '/' && req.method === 'GET') {
    return Response.json({
      message: 'Welcome to Alchemy Fly.io Example!',
      endpoints: {
        health: '/health',
        data: '/data (GET/POST)',
        env: '/env'
      },
      timestamp: new Date().toISOString()
    });
  }

  // Environment info endpoint (non-sensitive only)
  if (pathname === '/env' && req.method === 'GET') {
    return Response.json({
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      APP_NAME: process.env.APP_NAME,
      // Show that secrets are available (but don't expose values)
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      hasApiKey: !!process.env.API_KEY,
    });
  }

  // Data persistence endpoints
  if (pathname === '/data' && req.method === 'GET') {
    try {
      const data = await readData();
      return Response.json(data);
    } catch (error) {
      console.error('Failed to read data:', error);
      return Response.json({ error: 'Failed to read data' }, { status: 500 });
    }
  }

  if (pathname === '/data' && req.method === 'POST') {
    try {
      const body = await req.json();
      const existingData = await readData();

      // Add new entry
      const newEntry = {
        id: Date.now(), // This will be fixed when addressing the deterministic ID issue
        timestamp: new Date().toISOString(),
        data: body
      };

      existingData.entries = existingData.entries || [];
      existingData.entries.push(newEntry);
      existingData.lastUpdated = new Date().toISOString();

      await writeData(existingData);
      
      return Response.json({ 
        success: true, 
        entry: newEntry,
        totalEntries: existingData.entries.length
      });
    } catch (error) {
      console.error('Failed to write data:', error);
      return Response.json({ error: 'Failed to write data' }, { status: 500 });
    }
  }

  // Clear all data
  if (pathname === '/data' && req.method === 'DELETE') {
    try {
      const initialData = {
        initialized: true,
        timestamp: new Date().toISOString(),
        entries: []
      };
      
      await writeData(initialData);
      return Response.json({ success: true, message: 'All data cleared' });
    } catch (error) {
      console.error('Failed to clear data:', error);
      return Response.json({ error: 'Failed to clear data' }, { status: 500 });
    }
  }

  // 404 for unmatched routes
  return Response.json({ error: 'Not found' }, { status: 404 });
}

// Initialize and start server
async function startServer() {
  await initializeDataDir();
  
  const server = Bun.serve({
    port,
    hostname: '0.0.0.0',
    fetch: handleRequest,
  });

  console.log(`🚀 Server running on port ${server.port}`);
  console.log(`📊 Health check: http://localhost:${server.port}/health`);
  console.log(`💾 Data endpoint: http://localhost:${server.port}/data`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
}

startServer().catch(console.error);
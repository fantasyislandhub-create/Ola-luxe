const https = require('https');

const RENDER_URL = 'https://ola-backend-vmxs.onrender.com';

function keepAlive() {
  const options = {
    hostname: 'ola-backend-vmxs.onrender.com',
    port: 443,
    path: '/api/health',
    method: 'GET',
    timeout: 10000
  };

  const req = https.request(options, (res) => {
    console.log(`Keep-alive ping: ${res.statusCode} at ${new Date().toISOString()}`);
  });

  req.on('error', (error) => {
    console.error(`Keep-alive error: ${error.message} at ${new Date().toISOString()}`);
  });

  req.on('timeout', () => {
    req.destroy();
    console.error(`Keep-alive timeout at ${new Date().toISOString()}`);
  });

  req.end();
}

// Ping every 14 minutes to prevent sleep (Render spins down after 15 min)
const INTERVAL = 14 * 60 * 1000;

// Initial ping on startup
keepAlive();

// Set up recurring ping
setInterval(keepAlive, INTERVAL);

console.log(`Keep-alive service started - pinging ${RENDER_URL} every 10 minutes`);

module.exports = keepAlive;
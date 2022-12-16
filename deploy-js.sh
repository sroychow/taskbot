# Install dependencies
npm ci --production

# Start server
npm stop || echo 'Server was not started, continuing'
npm start

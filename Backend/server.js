const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const socket = require('./socket');

const server = http.createServer(app);
socket(server);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
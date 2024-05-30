const http = require('http');
const app = require('../server/app.js');
const PORT = 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Vous êtes connecté au port ${PORT}`)
});
const {createServer} = require('http');

const port = 3000;

createServer((req, res) => {
   console.log('Hi server open at 3000');
}).listen(port);

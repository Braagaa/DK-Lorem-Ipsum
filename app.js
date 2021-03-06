const {createServer} = require('http');
const {home, loadStatic, redirect, generate} = require('./routes/routes');

const port = process.env.PORT || 3000;
const methodMiddleware = {
    GET: [home, loadStatic, generate],
    POST: [redirect]
}

createServer((req, res) => {
    methodMiddleware[req.method]
        .forEach(fn => fn(req,res));
}).listen(port);

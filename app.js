const {createServer} = require('http');
const {home, loadStatic, generator} = require('./routes/routes');

const port = 3000;
const methodMiddleware = {
    GET: [home, loadStatic],
    POST: [generator]
}

createServer((req, res) => {
    console.log(req.url);

    methodMiddleware[req.method]
        .forEach(fn => fn(req,res));
}).listen(port);

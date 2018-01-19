const {parse} = require('querystring');
const {renderHTML, renderStatic} = require('./renderer');
const generate = require('../js/generator');
const {transform, isNumberDefaultTo} = require('../js/validate');

const types = {
    html: {'Content-Type': 'text/html'},
    '.css': {'Content-Type': 'text/css'},
    '.ico': {'Content-Type': 'image/x-icon'}
};

const minMaxWordCounts = {
    words: [1, 10000],
    sentences: [1, 2500],
    paragraphs: [1, 150]
};

const findType = str => type => str.toLowerCase().endsWith(type);

const home = async function({url}, res) {
    if (url === '/') {
        res.writeHead(200, types.html);
        await renderHTML('header', {title: 'DK Lipsum'}, res);
        await renderHTML('generator', {}, res);
        await renderHTML('footer', {}, res);
        res.end();
    } 
}

const loadStatic = function({url}, res) {
    Object.keys(types)
        .filter(findType(url))
        .forEach(async function(type) {
            res.writeHead(200, types[type]);
            await renderStatic(url, res);
            res.end();
        });
}

const generator = function(req, res) {
    if (req.url === '/') {
        req.on('data', data => {
            const test = [parse(data.toString())]
                .map(transform({amount: isNumberDefaultTo(1, 150, 5, 150)}));
            console.log(test);
        });
    }
}

module.exports = {home, loadStatic, generator};

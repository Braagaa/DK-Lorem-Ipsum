const {parse} = require('querystring');
const {renderHTML, renderStatic, renderHTMLItems} = require('./renderer');
const {createWords, createSentences, createParagraps} = require('../js/generator');
const {transform, isNumberDefaultTo} = require('../js/validate');

const title = 'DK Ipsum';

const types = {
    html: {'Content-Type': 'text/html'},
    '.css': {'Content-Type': 'text/css'},
    '.js': {'Content-Type': 'application/javascript'},
    '.ico': {'Content-Type': 'image/x-icon'},
    '.jpg': {'Content-Type': 'image/jpeg'},
};

const counts = {
    words: {min: 1, max: 10000, method: createWords},
    sentences: {min: 1, max: 1200, method: createSentences},
    paragraphs: {min: 1, max: 210, method: createParagraps}
}

const findType = str => type => str.toLowerCase().endsWith(type);

const home = async function({url}, res) {
    if (url === '/') {
        res.writeHead(200, types.html);
        await renderHTML('header', {title}, res);
        await renderHTML('generator', {}, res);
        await renderHTML('footer', {}, res);
        await renderHTML('script', {script: 'js/client.js'}, res);
        await renderHTML('close', {}, res);
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

const redirect = function(req, res) { //redirect is unnecessary, just for practice
    if (req.url === '/') {
        req.on('data', data => {
            const querystring = data.toString()
                .replace('&generate=Generate', '');
            res.writeHead(302, {location: `/feed/?${querystring}`});
            res.end();
        });
    }
}
    
const generate = function({url}, res) {
    if (url.startsWith('/feed/?')) {
        const stream = url.replace('/feed/?', '')
            .split()
            .map(query => parse(query));
        const [user] = stream;
        const min = counts[user.text].min;
        const max = counts[user.text].max;
        const method = counts[user.text].method;

        stream
            .map(transform({amount: isNumberDefaultTo(min, max, 5, max)}))
            .map(({amount}) => method(amount))
            .map(lipsum => {
                return {
                    lipsum: lipsum.split('\n\n'),
                    countW: lipsum.match(/[\w]+/g).length,
                    countS: lipsum.match(/[\w ]+/g).length,
                    countP: lipsum.split('\n\n').length
                };
            })
            .forEach(async function({lipsum, countW, countS, countP}) {
                res.writeHead(200, types.html);
                await renderHTML('header', {title}, res);
                await renderHTMLItems('display', {element: 'p', list: lipsum, replace: 'lipsum'}, res);
                await renderHTML('totals', {countW, countS, countP}, res);
                await renderHTML('footer', {}, res);
                res.end();
            });
    }
}

module.exports = {home, loadStatic, redirect, generate};

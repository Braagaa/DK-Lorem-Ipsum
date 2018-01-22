const fs = require('fs');
const {promisify} = require('util');

const readFile = promisify(fs.readFile);

const inputValues = function(values) {
    const entries = Object.entries(values);
    return function(html) {
        return entries.reduce((str, [key, value]) => {
            return str.replace(`{{${key}}}`, value);
        }, html);
    }
}

const write = res => content => res.write(content);
const error = err => console.error(err.message);

const renderHTML = function(name, values, res) {
    return readFile(`${__dirname}/../views/${name}.html`, 
        {encoding: 'UTF8'})
        .then(inputValues(values))
        .then(write(res))
        .catch(error);
}

const renderStatic = function(url, res) {
    return url.replace(/.+(\/.+\/.+)/, (str, p) => p)
        .split()
        .reduce((str, url) => readFile(`${__dirname}/../${url}`), '')
        .then(write(res))
        .catch(error);
}

module.exports = {renderHTML, renderStatic};

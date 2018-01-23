const list = 
[
    'kong', 'donkey', 'diddy', 'cranky', 'funky', 'candy', 'dixie',
    'wrinkly', 'tiny', 'chunky', 'kiddy', 'lanky', 'swanky', 'rambi',
    'squawks', 'clapper', 'expresso', 'rattly', 'winky', 'squitter',
    'ellie', 'parry', 'glimmer', 'fluri', 'helibird', 'hoofer', 'orco',
    'chops', 'rool', 'banana', 'balloon', 'KremKoin', 'DK', 'bonus',
    'barrel', 'watermelon', 'TNT', 'kremling'
];

const [sMin, sMax] = [3, 15];
const [pMin, pMax] = [3, 8];

const range = function(from, to, arr = []) {
    let i = -1;
    while(i++ !== to - 1) arr[i] = i + 1;
    return arr;
}

const randomNumber = function(min, max) {
    return function() {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

const group = function(min, max) {
    return function(a, i, arr, b = [], rNum = randomNumber(min,max)()) {
        return a.length === 0 ? 
            b : group(min, max)(a, i, arr, [...b, a.splice(0, rNum)]);
    }
}

const join = str => arr => arr.join(str);
const unWrapR = (a, v, i, l) => l[0];
const wrapR = (a, v, i, l) => [l];
const pickList = num => list[num];
const endSentence = str => str.endsWith('.') ? str : str + '.';
const capitalize = str => 
    str.charAt(0).toUpperCase() + str.slice(1, str.length);

const getWords = function(from, to) {
    return function(num) {
        return range(1, num)
            .map(randomNumber(from, to))
            .map(pickList)
            .join(' ');
    }
}
const getAllWords = getWords(0, list.length - 1);

const createSentences = function(from, to) {
    return function(numSentences) {
        return range(1, numSentences)
            .map(randomNumber(from, to))
            .map(getAllWords)
            .map(capitalize)
            .map(endSentence)
            .join(' ');
    }
}
const threeTofifteenWords = createSentences(sMin, sMax);

const createFormatedSentences = function(num) {
    return threeTofifteenWords(num)
        .split('. ')
        .reduce(wrapR, [])
        .map(group(pMin, pMax))
        .reduce(unWrapR, [])
        .map(join('. '))
        .map(endSentence)
        .join('\n\n')
}

const createFormatedWords = function(num) {
    return getAllWords(num)
        .split(' ')
        .reduce(wrapR, [])
        .map(group(sMin, sMax))
        .reduce(unWrapR, [])
        .map(join(' '))
        .map(capitalize)
        .map(endSentence)
        .reduce(wrapR, [])
        .map(group(pMin, pMax))
        .reduce(unWrapR, [])
        .map(join(' '))
        .join('\n\n')
}

const createParagraps = function(from, to) {
    return function(numParagraps) {
        return range(1, numParagraps)
            .map(randomNumber(from, to))
            .map(threeTofifteenWords)
            .join('\n\n');
    }
}
const threeToFiveSentences = createParagraps(pMin, pMax);

module.exports.createWords = createFormatedWords;
module.exports.createSentences = createFormatedSentences;
module.exports.createParagraps = threeToFiveSentences;

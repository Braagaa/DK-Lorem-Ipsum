const list = 
[
    'kong', 'donkey', 'diddy', 'cranky', 'funky', 'candy', 'dixie',
    'wrinkly', 'tiny', 'chunky', 'kiddy', 'lanky', 'swanky', 'rambi',
    'squawks', 'clapper', 'expresso', 'rattly', 'winky', 'squitter',
    'ellie', 'parry', 'glimmer', 'fluri', 'helibird', 'hoofer', 'orco',
    'chops', 'rool', 'banana', 'balloon', 'KremKoin', 'DK', 'bonus',
    'barrel', 'watermelon', 'TNT', 'kremling'
];

const range = function(from, to, arr = []) {
    return arr.length === to ? arr : range(from + 1, to, [...arr, from]);
}

const randomNumber = function(min, max) {
    return function() {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

const pickList = num => list[num];
const endSentence = str => str + '.';
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
const threeTofifteenWords = createSentences(3, 15);

const createParagraps = function(from, to) {
    return function(numParagraps) {
        return range(1, numParagraps)
            .map(randomNumber(from, to))
            .map(threeTofifteenWords)
            .join('\n\n');
    }
}
const threeToFiveSentences = createParagraps(3, 5);

module.exports.createWords = getAllWords;
module.exports.createSentences = threeTofifteenWords;
module.exports.createParagraps = threeToFiveSentences;

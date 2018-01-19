const transform = function(a) {
    return function(b) {
        const c = {};
        for (p in b) {
            c[p] = a[p] ? a[p](b[p]) : b[p];
        }
        return c;
    }
}

const log = val => {console.log(val);return val};
const returnValue = (a, v) => v;
const returnArray = (a, v) => [v];
const not = f => v => !f(v);
const greaterThan = greater => num => num > greater;
const lessThan = less => num => num < less;

const isNumberDefaultTo = (less, greater, minDefault, maxDefault) => num => 
    [num].map(parseInt)
        .filter(not(isNaN))
        .filter(not(lessThan(less)))
        .reduce(returnArray, [minDefault])
        .filter(not(greaterThan(greater)))
        .reduce(returnValue, maxDefault);

module.exports = {transform, isNumberDefaultTo};

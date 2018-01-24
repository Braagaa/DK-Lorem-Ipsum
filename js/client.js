const notElement = elm1 => elm2 => elm2 !== elm1;
const findElms = (prop, val) => elm => elm[prop] === val;
const style = (prop, value) => elm => {
    elm.style[prop] = value;
    return elm;
}
const classList = function(method, val) {
    return function(elm) {
        elm.classList[method](val);
        return elm;
    }
}

const getSiblings = elm => 
    Array.from(elm.parentElement.children).filter(notElement(elm));

const map = fn => arr => arr.map(fn);
const filter = fn => arr => arr.filter(fn);
const not = fn => val => !fn(val);

//Elements
const optionsDiv = document.querySelector('.options');
const checkboxes = Array.from(optionsDiv.querySelectorAll('input'));
const labelsBananas = checkboxes.map(getSiblings);


const bananaChange = function() {
    //deault to normal settings
    labelsBananas
        .map(map(style('opacity', 0.5)))
        .map(filter(findElms('tagName', 'svg')))
        .map(map(classList('remove', 'click-banana')))
    //animate on-click
    checkboxes
        .filter(not(notElement(this)))
        .map(getSiblings)
        .map(map(style('opacity', 1)))
        .map(filter(findElms('tagName', 'svg')))
        .map(map(classList('add', 'click-banana')))
};

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', bananaChange);
});

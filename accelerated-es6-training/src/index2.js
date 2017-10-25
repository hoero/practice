// -------------------------------------------------------------------------
//region Symbols

let symbol        = Symbol('debug');
let anotherSymbol = Symbol('debug');

console.log(symbol); // Symbol(debug)

console.log(typeof symbol); // symbol

console.log(symbol === anotherSymbol); // false

let obj = {
    name    : 'Max',
    [symbol]: 22
};

console.log(obj); // {name: "Max", Symbol(debug): 22}
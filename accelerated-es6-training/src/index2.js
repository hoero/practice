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


//endregion -------------------------------------------------------------------------
//region Shared Symbols
let sharedSymbol  = Symbol.for('age');
let sharedSymbol2 = Symbol.for('age');

console.log(sharedSymbol === sharedSymbol2); // true

let person = {
    name: 'Max'
};

function makeAge(person) {
    let ageSymbol     = Symbol.for('age');

    person[ageSymbol] = 27;
}

makeAge(person);

console.log(person[sharedSymbol]); // 27

// With unique IDs
symbol = Symbol('age');

function makeAgeUnique(person) {
    let ageSymbol     = Symbol('age');

    person[ageSymbol] = 27;
}

makeAgeUnique(person);

console.log(person[symbol]); // undefined

//endregion -------------------------------------------------------------------------
//region Advantages of unique Symbols
symbol     = Symbol.for('age');

person.age = 30;

function makeAgeUniqueAgain(person) {
    let ageSymbol     = Symbol.for('age');

    person[ageSymbol] = 27;
}

makeAgeUniqueAgain(person);

console.log(person[symbol]); // 27
console.log(person.age);     // 30

//endregion -------------------------------------------------------------------------
//region Well-Known Symbols

// toStringTag
class Person {}

let personClass = new Person();

console.log(personClass); // Person {}

Person.prototype[Symbol.toStringTag] = 'PersonClass';

// toPrimitive
let numbers = [1, 2, 3];

console.log(numbers + 1); // 1,2,31

numbers[Symbol.toPrimitive] = function() {
    return 999;
}

console.log(numbers + 1); // 1000
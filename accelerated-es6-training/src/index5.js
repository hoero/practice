// -------------------------------------------------------------------------
//region The Object

// Assign
let obj1 = { a : 1 };
let obj2 = { b : 2 };

let obj = Object.assign(obj1, obj2);

console.log(obj); // {a: 1, b: 2}

// What will happen if we merge 2 objects which for example have different constructors and therefore prototypes?
class Obj1 {
    constructor() {
        this.a = 1;
    }
}

class Obj2 {
    constructor() {
        this.b = 2;
    }
}

obj1 = new Obj1();
obj2 = new Obj2();

obj = Object.assign(obj1, obj2);

console.log(obj); // Obj1 {a: 1, b: 2}

console.log(obj instanceof Obj1); // true
console.log(obj instanceof Obj2); // false

console.log(obj.__proto__ === Obj1.prototype);   // true
console.log(obj.__proto__ === Obj2.prototype);   // false
console.log(obj.__proto__ === Object.prototype); // false


obj = Object.assign(obj2, obj1);

console.log(obj); // Obj2 {b: 2, a: 1}

console.log(obj instanceof Obj1); // false
console.log(obj instanceof Obj2); // true

console.log(obj.__proto__ === Obj1.prototype);   // false
console.log(obj.__proto__ === Obj2.prototype);   // true
console.log(obj.__proto__ === Object.prototype); // false


obj = Object.assign({}, obj1, obj2);

console.log(obj); // {a: 1, b: 2}

console.log(obj.__proto__ === Obj1.prototype);   // false
console.log(obj.__proto__ === Obj2.prototype);   // false
console.log(obj.__proto__ === Object.prototype); // true


// setPrototypeOf
let person = { name : 'Max' };
let boss   = { name : 'Anna' };

console.log(person.__proto__ === Object.prototype); // true

Object.setPrototypeOf(person, boss);

console.log(person.__proto__ === boss.prototype); // false
console.log(person.__proto__ === boss);           // true

console.log(person.name); // Max

person = {};

Object.setPrototypeOf(person, boss);

console.log(person.name); // Anna

//endregion -------------------------------------------------------------------------
//region Math Object

// sign
let number = -10;
console.log(Math.sign(number)); // -1

number = 10;
console.log(Math.sign(number)); // 1

number = 0;
console.log(Math.sign(number)); // 0

number = NaN;
console.log(Math.sign(number)); // NaN

number = 'string';
console.log(Math.sign(number)); // NaN

number = '10';
console.log(Math.sign(number)); // 1

// trunc

number = 0.78;
console.log(Math.trunc(number)); // 0

number = 3.78;
console.log(Math.trunc(number)); // 3

number = 3.78;
console.log(Math.floor(number)); // 3

number = -3.78;
console.log(Math.floor(number)); // 4

number = -3.78;
console.log(Math.trunc(number)); // -3

//endregion -------------------------------------------------------------------------
//region Strings

let name = 'Hoeru';

// startsWith
console.log(name.startsWith('Ho'));  // true
console.log(name.startsWith('Hoo')); // false
console.log(name.startsWith('HO'));  // false

// endsWith
console.log(name.endsWith('ru'));  // true
console.log(name.endsWith('RU'));  // false

// includes
console.log(name.includes('Ho'));   // true
console.log(name.includes('eru'));  // true
console.log(name.includes('eRu'));  // false

//endregion -------------------------------------------------------------------------
//region Number Object

// isNaN
number = NaN;

console.log(isNaN(number));        // true
console.log(Number.isNaN(number)); // true

// isFinite
number = 100000000000000;
console.log(Number.isFinite(number)); // true

number = Infinity;
console.log(Number.isFinite(number));  // false
console.log(!Number.isFinite(number)); // true

// isInteger
number = Infinity;
console.log(Number.isInteger(number)); // false

number = 10;
console.log(Number.isInteger(number)); // true

number = 10.1;
console.log(Number.isInteger(number)); // false

//endregion -------------------------------------------------------------------------
//region Arrays

let array = Array(5);
console.log(array); // [empty × 5]

// of
array = Array.of(5);
console.log(array); // [5]

array = Array.of(5, 10, 15);
console.log(array); // [5, 10, 15]

// from
array = [5, 10, 15];
console.log(array); // [5, 10, 15]

let newArray = Array.from(array, val => val * 2);
console.log(newArray); // [10, 20, 30]

// fill
array.fill(100);
console.log(array); // [100, 100, 100]

array = [5, 10, 15];
array.fill(100, 1);
console.log(array); // [5, 100, 100]

array = [5, 10, 15];
array.fill(100, 1, 2);
console.log(array); // [5, 100, 15]

// copyWithin
console.log(array.copyWithin(1, 2));    // [5, 15, 15]

array = [5, 10, 15];
console.log(array.copyWithin(1, 0));    // [5, 5, 10]

array = [5, 10, 15];
console.log(array.copyWithin(1, 0, 2)); // [5, 5, 10]

// entries
array = [5, 10, 15];
console.log(array.entries()); // Array Iterator {}

let it = array.entries();

for (let key of it) {
    console.log(key); // [0, 5] [1, 10] [2, 15]
}
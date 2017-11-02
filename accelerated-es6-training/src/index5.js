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
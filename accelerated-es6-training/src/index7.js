// -------------------------------------------------------------------------
//region The Reflect API

class Person {
    constructor(name) {
        this.name = name;
    }
}

function newPrototype() {
    this.age = 27;
}

let person = Reflect.construct(Person, ['Max']);

console.log(person instanceof Person);              // true
console.log(person.__proto__ === Person.prototype); // true

person = Reflect.construct(Person, ['Max'], newPrototype);

console.log(person.__proto__ === Person.prototype);       // false
console.log(person.__proto__ === newPrototype.prototype); // true
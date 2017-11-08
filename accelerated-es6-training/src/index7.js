// -------------------------------------------------------------------------
//region The Reflect API: Creating Objects with Reflect.construct()

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

//endregion -------------------------------------------------------------------------
//region Calling Functions with Reflect.apply()

class Person1 {
    constructor(name, age) {
        this.name = name;
        this.age  = age;
    }

    greet(prefix) {
        console.log(`${prefix} Hello, I am ${this.name}`);
    }
}

person = Reflect.construct(Person1, ['Max', 27]);

Reflect.apply(person.greet, person, []);           // Hello, I am Max
Reflect.apply(person.greet, person, ['...']);      // ... Hello, I am Max
Reflect.apply(person.greet, {}, []);               // Hello, I am undefined
Reflect.apply(person.greet, { name: 'Anna' }, []); // Hello, I am Anna

//endregion -------------------------------------------------------------------------
//region Reflect and Prototypes

class Person2 {
    constructor() {
        this.name = 'Max';
    }
}

person = new Person();

Person.prototype.age = 27;

console.log(Reflect.getPrototypeOf(person)); // {age: 27, constructor: ƒ}

console.log(Reflect.getPrototypeOf(person) === Person.prototype); // true

let proto = {
    age: 30
};

Reflect.setPrototypeOf(person, proto);

console.log(Reflect.getPrototypeOf(person)); // {age: 30}
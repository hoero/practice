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
//region Reflect and Prototypes + Interactions between *

class Person2 {
    constructor() {
        this.name = 'Max';
    }
}

person = new Person2();

Person2.prototype.age = 27;

console.log(Reflect.getPrototypeOf(person)); // {age: 27, constructor: ƒ}

console.log(Reflect.getPrototypeOf(person) === Person2.prototype); // true

let proto = {
    age: 30,
    greet() {
        console.log('Hello');
    }
};

Reflect.setPrototypeOf(person, proto);

console.log(Reflect.getPrototypeOf(person)); // {age: 30, greet: ƒ}

Reflect.apply(person.greet, null, []); // Hello

//endregion -------------------------------------------------------------------------
//region Accessing Properties with Reflect

class Person3 {
    constructor(name, age) {
        this._name = name;
        // this.name = name;
        this.age  = age;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }
}

let mum = {
    _name: 'Mum'
};

person = new Person3('Max', 27);

// console.log(Reflect.get(person, 'name')); // Max

// Reflect.set(person, 'name', 'Anna', mum);

// console.log(mum); // {_name: "Anna"}

// console.log(Reflect.get(person, 'name')); // Anna

// console.log(Reflect.get(person, 'name', mum)); // Anna

// console.log(Reflect.has(person, 'name')); // true

console.log(Reflect.ownKeys(person)); // ["_name", "age"]

//endregion -------------------------------------------------------------------------
//region Creating & Deleting Properties with Reflect + Preventing Object Extensions

console.log(Reflect.isExtensible(person)); // true

Reflect.preventExtensions(person);

console.log(Reflect.isExtensible(person)); // false

Reflect.defineProperty(person, 'hobbies', {
    writable: true,
    value   : ['Sports', 'Cooking']
});

console.log(person.hobbies); // undefined

// person.hobbies = 'Nothing';

// console.log(person.hobbies); // Nothing

// Reflect.deleteProperty(person, 'age');

// console.log(person.age); // undefined
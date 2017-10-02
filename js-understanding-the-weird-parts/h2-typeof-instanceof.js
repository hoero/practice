// ---------------------------------------------------------------------------------------------------------
// typeof, instanceof, and figuring out what something is

var a = 3;
console.log(typeof a); // number

var b = 'Hello';
console.log(typeof b); // string

var c = {};
console.log(typeof c); // object

var d = [];
console.log(typeof d); // object --- Weird!
console.log(d.toString()); // Empty string!
console.log(Object.prototype.toString.call(d)); // [object Array] --- Better!
// Or
console.log(Array.isArray(d)); // true

function Person(name) {
    this.name = name;
}

var e = new Person('Jane');
console.log(typeof e); // object
console.log(e instanceof Person); // true

console.log(typeof undefined); // undefined
console.log(typeof null); // object

var z = function() {};
console.log(typeof z); // function

var s = Symbol;
console.log(typeof s); // function
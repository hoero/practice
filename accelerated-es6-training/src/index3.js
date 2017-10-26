// -------------------------------------------------------------------------
//region Iterator basics

let array = [ 1, 2, 3 ];

console.log(typeof array[Symbol.iterator]); // function

let it = array[Symbol.iterator]();

console.log(it); // Array Iterator {}

console.log(it.next()); // {value: 1, done: false}
console.log(it.next()); // {value: 2, done: false}
console.log(it.next()); // {value: 3, done: false}
console.log(it.next()); // {value: undefined, done: true}
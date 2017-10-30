// -------------------------------------------------------------------------
//region Arrow Functions

const btn = document.querySelector('button');

const afn = () => console.log(this);

function fn() {
    console.log(this);
}

fn();  // Window object
afn(); // Window object

btn.addEventListener('click', fn);  // HTML button element
btn.addEventListener('click', afn); // Window object

//endregion -------------------------------------------------------------------------
//region Object literal extensions

const name     = `Ana`;
const age      = 25;
const ageField = "age";

const obj      = {
    "name": `Max`,
    [ageField]: 28,
    "greet me"() {
        console.log(`${this.name}, ${this.age}`); // Max, 25
    }
};

obj["greet me"]();

console.log(obj.age);       // 28
console.log(obj['age']);    // 28
console.log(obj[ageField]); // 28

//endregion -------------------------------------------------------------------------
//region Template literals

const fname = `Max`;

const greeting = `
    Hello, I'm \${fname + '!!!'}
`;

console.log(greeting); // Hello, I'm ${fname + '!!!'}

//endregion -------------------------------------------------------------------------
//region Destructuring

const numbers   = [1, 2, "3"];
const [a, ...b] = numbers;

console.log(b); // [2, "3"]

//Defaults
const [firstName = 'George', lastName, lastName2 = 'Santos'] = ['Jorge', 'Manuel'];

console.log(firstName, lastName2); // Jorge Santos

// Swaping
let base       = 5;
let multiple   = 10;

[multiple, base] = [base, multiple]
console.log(base, multiple); // 10 5

// Ignoring
const [first, , third] = numbers;
console.log(first, third); // 1 "3"

// Aliases
const {jname, greet: hello} = {
    name: 'John',
    age : 26,
    greet() { console.log('Hello') }
};

hello(); // Hello
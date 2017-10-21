//  -------------------------------------------------------------------------
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

let name     = `Ana`;
let age      = 25;
let ageField = "age";

let obj  = {
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
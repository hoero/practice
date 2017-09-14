// ---------------------------------------------------------------------------------------------------------
// By value (primitives)

var number = 3,
    AnotherNumber;

AnotherNumber  = number;
number        += 1;

console.log(number);        // 4
console.log(AnotherNumber); // 3

// ---------------------------------------------------------------------------------------------------------
// By reference (objects)

var greeting = { basic: 'Hi' },
    AnotherGreeting;

AnotherGreeting = greeting;
greeting.basic  = 'Hello';

console.log(greeting);        // {basic: "Hello"}
console.log(AnotherGreeting); // {basic: "Hello"}

// Even as parameters
function changeGreeting(obj) {
    obj.basic = 'Hola';
}

changeGreeting(AnotherGreeting);

console.log(greeting);        // {basic: "Hola"}
console.log(AnotherGreeting); // {basic: "Hola"}

// = operator sets up new memory space (new address)
AnotherGreeting = { basic: 'こんにちは' };

console.log(greeting);        // {basic: "Hola"}
console.log(AnotherGreeting); // {basic: "こんにちは"}
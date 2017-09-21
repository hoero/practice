// ---------------------------------------------------------------------------------------------------------
// Method borrowing

var john = {
    name        : 'John',
    age         : 26,
    job         : 'teacher',
    presentation: function(style, timeOfDay) {
        if (style === 'formal') {
            console.log(`Good ${timeOfDay}, Ladies and gentlemen! I'm ${this.name}, I'm a ${this.job} and I'm ${this.age} years old.`);
        } else if (style === 'friendly') {
            console.log('Hey! What\'s up? I\'m ' + this.name + ', and I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.');
        }
    }
};

john.presentation('formal', 'morning'); // Good morning, Ladies and gentlemen! I'm John, I'm a teacher and I'm 26 years old.

var emily = {
    name: 'Emily',
    age : 35,
    job : 'designer'
};

// Call method
john.presentation.call(emily, 'friendly', 'afternoon'); // Hey! What's up? I'm Emily, and I'm a designer and I'm 35 years old. Have a nice afternoon.

// Apply method
john.presentation.apply(emily, ['formal', 'evening']); // Good evening, Ladies and gentlemen! I'm Emily, I'm a designer and I'm 35 years old.

// ---------------------------------------------------------------------------------------------------------
// Method currying, is just a technique in which we create a function based on another function, but with some preset parameters.

// Bind method
var johnFriendly = john.presentation.bind(john, 'friendly');

johnFriendly('evening'); // Hey! What's up? I'm John, and I'm a teacher and I'm 26 years old. Have a nice evening.
johnFriendly('night');   // Hey! What's up? I'm John, and I'm a teacher and I'm 26 years old. Have a nice night.

var emilyFormal = john.presentation.bind(emily, 'formal');

emilyFormal('afternoon'); // Good afternoon, Ladies and gentlemen! I'm Emily, I'm a designer and I'm 35 years old.


// Another example, show ages and if it's full of age
var years = [1962, 1959, 1991, 2007, 1999];

function arrayCalc(arr, fn) {
  var arrRes = [];
  
  for (var i = 0; i < arr.length; i++) {
    arrRes.push(fn(arr[i]));
  }
  
  return arrRes;
}

function calculateAge(el) {
  return new Date().getFullYear() - el;
}

function isFullAge(limit, el) {
  return el >= limit;
}

var ages = arrayCalc(years, calculateAge);
var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20)); // Here I set the first argument (limit) to 20

console.log(ages); // [55, 58, 26, 10, 18]
console.log(fullJapan); // [true, true, true, false, false]


// Another example, a multiply by two function based on a simple multiplication function 
function multiply(a, b) {
    return a * b;
}

var multiplyByTwo = multiply.bind(null, 2); // The 'this' variable should always be set, if there is no argument to set it, use the 'this' keyword or 'null' instead.

/**
 * bind modifies function signature to be just multiply(b) before return. so it will look like this,
 * multiply(b) {
        return 2 * b;
    }; 
 */

console.log(multiplyByTwo(4)); // 8


// ---------------------------------------------------------------------------------------------------------
// Also you can create a function on the fly, an IIFE and use these methods with it.

(function(style, timeOfDay) {
    if (style === 'formal') {
        console.log(`Good ${timeOfDay}, Ladies and gentlemen! I'm ${this.name}, I'm a ${this.job} and I'm ${this.age} years old.`);
    } else if (style === 'friendly') {
        console.log('Hey! What\'s up? I\'m ' + this.name + ', and I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.');
    }
}).call(john, 'friendly', 'evening'); // Hey! What's up? I'm John, and I'm a teacher and I'm 26 years old. Have a nice evening.
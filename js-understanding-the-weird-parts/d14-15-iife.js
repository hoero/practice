// ---------------------------------------------------------------------------------------------------------
// Immediately invoked function expressions (IIFE)

var greeting = function(name) {
    return 'Hi' + name;
}('John');

console.log(greeting); // Hi John

// Here the parenthesis are not necessary, unless you're using Reveal Module Pattern
var greet = (function(name) { 
    return 'Hi' + name;
}('John'));

// Here the invocation (parenthesis) is outside the first ()
(function(name) {
    return 'Hi' + name;
})();

// ---------------------------------------------------------------------------------------------------------
// IIFE and safe code

(function(global, name) {

    var greeting = 'Hello';

    global.greeting = 'Hi'; // Intentionally crash

    console.log(greeting + ' ' + name);

}(window, 'John'));
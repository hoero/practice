// ---------------------------------------------------------------------------------------------------------
/**
 * Example 1,
 * Is it possible to access variable a and b from the callback function?
 * Also, why does this not work? Is this because the function is defined lexically outside of the scope where a and b are defined?
 * That's right. The function is lexically scoped, and is created outside of where a and b are defined.
 * So a and b aren't accessible to it along the scope chain.
 */
// 

function name(callback) {
	var a = '1000'
	var b = 2000;
	
	callback();
}

name(function() {
    // console.log(a + b);
}); // Doesn’t work, Uncaught ReferenceError: a is not defined

// ---------------------------------------------------------------------------------------------------------
/**
 * Example 2,
 * You can pass parameters to a callback function that are both inside a common function,
 * to expose those parameters values to that callback function which expects those
 */
// 

function fullName(firstName, lastName, callback) {
    console.log(`My name is ${firstName} ${lastName}.`);
    callback(lastName); // Exposes
}

function greeting(param) { // Expetcs
    console.log(`Welcome Mr.${param}.`)
}

fullName('Hoeru', 'Oriba', greeting);

/**
 * Output:
 * My name is Hoeru Oriba.
 * Welcome Mr.Oriba.
 */
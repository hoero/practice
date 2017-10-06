// ---------------------------------------------------------------------------------------------------------
// Conceptual aside: Operators 

var b = 1,
    c = 2,   // 3
    b = c++; // 2

/*
    b = c++;

    the 'c++' is actually run first (higher precedence comes first). Why is b=2 then? Because the postfix increment operator returns the value the variable was prior to incrementing.

    So the sequence is:

    b = c++; // the ++ is run and c is incremented to 3 in memory, however the ++ returns 2 (the value prior to incrementing)

    b = 2; // the equality is run and b is set to 2 and equality returns the right side
*/

"hi" + 3; // string plus number is string

"hi" + {}; // string plus object is string

"hi" + function() {}; // string plus function is string

[] * []; // this results in 0

1 * '2'; // results in 2

false == 0; // true

null == 0; // false

null < 1; // true

'' == 0; // true

'' == false; // true


// ---------------------------------------------------------------------------------------------------------------------------
// || Operator

undefined || 'hello'; // hello, it returns the value the was coerced to true
'hi' || 'hello'; // hi, it returns the first value that was coerced to true

function greet(name) {
    name = name || '<Your name here>';
    // If you wanted to catch the 0 case:
    name = name === 0 ? 0 : name || '<Your name here>';
    console.log('Hello' + name);
}

greet('Tony'); // 'Hello Tony', because the || operator will not evaluate the second expression if the first expression is true.
greet();       // 'Hello <Your name here>', because the first argument is false

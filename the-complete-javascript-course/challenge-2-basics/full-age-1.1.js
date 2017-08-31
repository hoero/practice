///////////////////////////////////////
// CODING CHALLENGE 2

/*
1. Create an array with some years where persons were born
2. Create an empty array (just [] )
3. Use a loop to fill the array with the ages of the persons
4. Use another loop to log into the console whether each person is of full age (18 or older), as well as their age

5. Finally, create a function called printFullAge which receives the array of years as an argument, executes the steps 2., 3. and 4. and returns an array of true/false boolean values: true if the person is of full age (>= 18 years) and false if not (< 18 years)
6. Call the function with two different arrays and store the results in two variables: full_1 and full_2

Example input:  [1965, 2008, 1992]
Example output: [true, false, true]

Hint: you can use a loop not only to read from an array, like y[i], but also to set values in an array, like y[i] = ... You can also use the specific array methods.
*/

var years  = [1959, 1962, 2008, 1991]; // step 1
var years2 = [1939, 1989, 2013, 1970];

// It creates a new array based on returned values of a function that accept the same array used in it
function newArray(array, fn) {
  const results = [];

  for (const key of array) {
    results.push(fn(array[key]));
  }

  return results;
}

function calcAge(year) { return new Date().getFullYear() - year; }

function fullAge(ages) {
  for (const key of ages) {
    if (ages[key] >= 18) {
      
      console.log('Person ' + (key + 1) + ' is of full age, his age is ' + ages[key] + ' years old.');
      return true;

    } else {
        
      console.log('Person ' + (key + 1) + ' is NOT of full age, his age is ' + ages[key] + ' years old.');
      return false;

    }
  }
}

function printFullAge(years) {  // step 5
  var ages        = newArray(years, calcAge); // step 2 and 3
  var booleanAges = newArray(ages, fullAge);  // step 4
  
  return booleanAges;  // step 4
}

// step 6
var full_1 = printFullAge(years); 
var full_2 = printFullAge(years2);
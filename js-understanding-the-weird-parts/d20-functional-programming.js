// ---------------------------------------------------------------------------------------------------------
// Example

var values  = [1, 2, 3],
    results = [];

for (var i = 0; i < values.length; i++) {
    results.push(values[i] * 2);    
}

console.log(results); // [2, 4, 6]


// Approach with functional programming
function mapForEach(arr, fn) {
  var arrRes = [];
  
  for (var i = 0; i < arr.length; i++) {
    arrRes.push(fn(arr[i]));
  }
  
  return arrRes;
}

var results2 = mapForEach(values, function(item) {
    return item * 2;
});

var results3 = mapForEach(values, function(item) {
    return item > 2;
});

console.log(results2); // [2, 4, 6]
console.log(results3); // [false, false, true]


// Passing the first parameter with bind
var checkPassedLimit = function(limit, item) {
    return item > limit;
};

var results4 = mapForEach(values, checkPassedLimit.bind(null, 2));

console.log(results4); // [false, false, true]

// Simpler solution
var simpleCheckPassedLimit = function(limit) {
    return function(limit, item) {
        return item > limit;
    }.bind(null, limit); 
};

var results5 = mapForEach(values, simpleCheckPassedLimit(1));

/**
 * bind modifies function signature to be just function(item) before return. so it will look like this,
 * function(item) {
        return item > 1;
    }; 
 */

console.log(results5); // [false, true, true]

// Another solution with closure
var closure = function(limit) {
    return function(item) {
        return item > limit;
    };
};

var results6 = mapForEach(values, closure(3));

console.log(results6); // [false, false, false]

// ---------------------------------------------------------------------------------------------------------
// Using underscoreJS: needs it to be able to work
 
var results7 = _.map(values, function(item) { return item * 3; });
console.log(results2); // [3, 6, 9]

var results8 = _.filter([2, 3, 4, 5, 6, 7], function(item) { return item % 2 === 0; });
console.log(results2); // [2, 4, 6]

/**
 * In the second one, I want to get back only items that have a remainder when divided by 2 of 0.
 * So this should give me back a filter.
 * It will filter out of this list and give me back a sub list.
 * So I've essentially queried this long array and gotten back only items divisible by 2.
 */
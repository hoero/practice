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

console.log(results5); // [false, true, true]
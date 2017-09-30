// ---------------------------------------------------------------------------------------------------------
// Dangerous aside: Arrays and for…in

Array.prototype.myCustomFeature = 'Cool!';

var arr = ['John', 'Jane', 'Jim'];

for (var prop in arr) {
    console.log(prop + ': ' + arr[prop]);
}

/**
 * Output:
 * 0: John
 * 1: Jane
 * 2: Jim
 * myCustomFeature: Cool!
 */
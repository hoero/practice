type Combinable = number | string;
type ConversionFormat = 'number' | 'text';

function combine(a: Combinable, b: Combinable, convertTo: ConversionFormat) {
    let result;
    if (
        (typeof a === 'number' && typeof b === 'number') ||
        convertTo === 'number'
    ) {
        result = +a + +b;
    } else {
        result = a.toString() + b.toString();
    }
    return result;
}

const combinedAges = combine(30, 50, 'number');
console.log(combinedAges);

const combinedStringAges = combine('30', '50', 'number');
console.log(combinedStringAges);

const combinedNames = combine('Max', 'Anna', 'text');
console.log(combinedNames);

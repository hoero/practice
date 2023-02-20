function add(a: number, b: number) {
    return a + b;
}

function printResult(num: number) {
    console.log('Result is ' + num);
}

function addAndThen(a: number, b: number, callback: (num: number) => void) {
    const result = a + b;
    callback(result);
}

printResult(add(1, 2));

let combineValues: (a: number, b: number) => number;

combineValues = add;

console.log(combineValues(3, 4));

addAndThen(5, 6, (result) => {
    console.log(result);
});

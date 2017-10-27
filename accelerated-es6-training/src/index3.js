// -------------------------------------------------------------------------
//region Iterator basics

let array = [ 1, 2, 3 ];

console.log(typeof array[Symbol.iterator]); // function

let it = array[Symbol.iterator]();

console.log(it); // Array Iterator {}

console.log(it.next()); // {value: 1, done: false}
console.log(it.next()); // {value: 2, done: false}
console.log(it.next()); // {value: 3, done: false}
console.log(it.next()); // {value: undefined, done: true}

//endregion -------------------------------------------------------------------------
//region Iterators in Action

array[Symbol.iterator] = function() {

    let nextValue = 10;
    
    return {
        next() {
            nextValue++;

            return {
                done : nextValue > 15 ? true : false,
                value: nextValue
            }
        }
    }

}

for (let element of array) {
    console.log(element); // 11 12 13 14 15
}

//endregion -------------------------------------------------------------------------
//region Creating a Custom Iterateable Object

let person = {
    name: 'Max',
    hobbies: ['Sports', 'Cooking'],
    [Symbol.iterator]() {
        let i = 0;

        let hobbies = this.hobbies;
        
        return {
            next() {
                let value = hobbies[i];
                
                i++;

                return {
                    done : i > hobbies.length ? true: false,
                    value: value
                }
            }
        }
    }
};


for (let hobby of person) {
    console.log(hobby); // Sports Cooking
}

//endregion -------------------------------------------------------------------------
//region Generators Basics

function *select() {
    yield 'House';
    yield 'Garage';
}

it = select();

console.log(it.next()); // {value: "House", done: false}
console.log(it.next()); // {value: "Garage", done: false}
console.log(it.next()); // {value: undefined, done: true}

//endregion -------------------------------------------------------------------------
//region Generators in Action

let obj = {
    [Symbol.iterator]: gen
};

function *gen() {
    yield 1;
    yield 2;
}

for (let element of obj) {
    console.log(element); // 1 2
}

// With argument
function *gene(end) {
    for (var i = 0; i < end; i++) {
        yield i;    
    }
}

it = gene(2);

console.log(it.next()); // {value: 1, done: false}
console.log(it.next()); // {value: 2, done: false}
console.log(it.next()); // {value: undefined, done: true}
console.log(it.next()); // {value: undefined, done: true}
// -------------------------------------------------------------------------
//region Modules
import * as imported from "./external";

console.log(imported); // Object

console.log(imported.keyValue); // 1000

imported.test(); // Tested!

console.log(imported.keyValue); // 2000

console.log(imported.default); // Some text

//endregion -------------------------------------------------------------------------
//region Classes
class Person {
    constructor (name) {
        this._name = name;
    }
    
    // Getter
    get name() {
        return this._name.toUpperCase();
    }

    // Setter
    set name(value) {
        if (value.length > 2) {

            this._name = value;

        } else {

            console.log('Rejected');
            
        }
    }
}

let person = new Person('Max');

console.log(person); // Person {_name: "Max"}
console.log(person.name); // MAX

person.name = 'Ma' // Rejected

console.log(person); // Person {_name: "Max"}

person.name = 'Anna'

console.log(person); // Person {_name: "Anna"}
console.log(person.name); // ANNA
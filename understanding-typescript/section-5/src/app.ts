// type Add = (a: number, b: number) => number;
interface Add {
    (a: number, b: number): number;
}

let add: Add;

add = (a: number, b: number) => a + b;

interface Named {
    name?: string;
}

interface Greetable extends Named {
    greet(phrase: string): void;
}

class Person implements Greetable {
    name?: string;
    age = 30;

    constructor(name?: string) {
        if (name) {
            this.name = name;
        }
    }

    greet(phrase: string) {
        if (this.name) {
            console.log(`${phrase} ${this.name}`);
        } else {
            console.log('Hi!');
        }
    }
}

let user: Greetable;

user = new Person();

user.greet('Hi, I am');

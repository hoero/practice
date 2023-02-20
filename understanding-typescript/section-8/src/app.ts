function Logger(msg: string) {
    return function Logger(constructor: Function) {
        console.log(msg);
        console.log(constructor);
    };
}

function WithTemplate(template: string, hookId: string) {
    console.log('TEMPLATE FACTORY');
    return function <T extends { new (...args: any[]): { name: string } }>(
        originalConstructor: T
    ) {
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                console.log('Rendering template');
                const hookElement = document.getElementById(hookId);
                if (hookElement) {
                    hookElement.innerHTML = template;
                    hookElement.querySelector('h1')!.textContent = this.name;
                }
            }
        };
    };
}

// @Logger('Logging - Person')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
    name = 'John';

    constructor() {
        console.log('Creating person object...');
    }
}

const person = new Person();

// ---

function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator!');
    console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accesor decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log3(
    target: any,
    name: string | Symbol,
    descriptor: PropertyDescriptor
) {
    console.log('Method decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
    console.log('Parameter decorator!');
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product {
    @Log
    title: string;
    constructor(t: string, private _price: number) {
        this.title = t;
    }

    @Log2
    set price(value: number) {
        if (value < 0) {
            throw new Error(
                `${this.title} Invalid price - must be a positive number`
            );
        }
        this._price = value;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}

function Autobind(_: any, _n: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}

class Printer {
    message = 'This works!';

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();

const button = document.querySelector('button');
button?.addEventListener('click', p.showMessage);

interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[]; // ['required', 'positive']
    };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [
            ...(registeredValidators[target.constructor.name]?.[propName] ??
                []),
            'required',
        ],
    };
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [
            ...(registeredValidators[target.constructor.name]?.[propName] ??
                []),
            'positive',
        ],
    };
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    let isValid = true;
    if (!objValidatorConfig) {
        return true;
    }
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;

                default:
                    break;
            }
        }
    }
    return isValid;
}

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;
    const title = titleEl.value;
    const price = +priceEl.value;

    const addCourse = new Course(title, price);

    if (!validate(addCourse)) {
        alert('Invalid input, please try again!');
        return;
    }
    console.log(addCourse);
});

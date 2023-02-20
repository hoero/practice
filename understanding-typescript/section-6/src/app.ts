type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const employee: ElevatedEmployee = {
    name: 'John',
    privileges: ['create-server'],
    startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type universal = Combinable & Numeric;

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): number;
function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

const result = add('Max', ' Schwarzmüller');
result.split(' ');

type UnknownEmployee = Employee | Admin;

function printEmployeeInfo(employee: UnknownEmployee) {
    console.log(`Name: ${employee.name}`);
    if ('privileges' in employee) {
        console.log(`Privileges: ${employee.privileges}`);
    }
    if ('startDate' in employee) {
        console.log(`Start Date: ${employee.startDate}`);
    }
}

printEmployeeInfo(employee);

class Car {
    drive() {
        console.log('Driving...');
    }
}

class Truck {
    drive() {
        console.log('Trucking...');
    }

    loadCargo(amount: number) {
        console.log(`Loading cargo...${amount}`);
    }
}

type Vehicle = Car | Truck;

const car = new Car();
const truck = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}

useVehicle(car);
useVehicle(truck);

interface Bird {
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed: number;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log(`Moving at speed ${speed}`);
}

moveAnimal({ type: 'bird', flyingSpeed: 10 });

// const input = <HTMLInputElement>document.getElementById('user-input');
// const input = document.getElementById('user-input')! as HTMLInputElement;
const input = document.getElementById('user-input');

// input.value = 'Hi there!';
if (input) {
    (input as HTMLInputElement).value = 'Hi there!';
}

interface ErrorContainer {
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email address',
    userName: 'Must start with a capital letter',
};

const fetchedData = {
    id: 'u1',
    name: 'John',
    job: { title: 'CEO', description: 'My own company' },
};

console.log(fetchedData?.job?.title);

const userInput = null;

const storedData = userInput ?? 'DEFAULT';

console.log(storedData);

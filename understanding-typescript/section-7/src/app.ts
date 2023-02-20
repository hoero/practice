// const names: Array<string> = []; // string[]
// names[0].split(' ');

// const promise: Promise<number> = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve(10);
//     }, 100);
// });

// promise.then((data) => {
//     // data.split(' ');
// });

function merge<T extends object, U extends object>(a: T, b: U) {
    return Object.assign(a, b);
}

const merged = merge(
    { name: 'John', hobbies: ['Sports', 'Cooking'] },
    { age: 30 }
);
console.log(merged);

interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(el: T): [T, string] {
    let text = 'Got no value.';
    if (el.length === 1) {
        text = 'Got 1 element.';
    } else if (el.length > 1) {
        text = `Got ${el.length} elements.`;
    }
    return [el, text];
}

console.log(countAndDescribe('Hi there'));

function extractAndConvert<T extends object, U extends keyof T>(
    obj: T,
    key: U
) {
    return `Value ${obj[key]}`;
}

extractAndConvert({ name: 'Max' }, 'name');

class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    add(item: T) {
        this.data.push(item);
    }

    remove(item: T) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }

    get() {
        return [...this.data];
    }
}

const stringStorage = new DataStorage<string>();
stringStorage.add('Max');
stringStorage.add('Manu');
stringStorage.remove('Max');
console.log(stringStorage.get());

const numberStorage = new DataStorage<number>();

// const objectStorage = new DataStorage<object>();
// const max = { name: 'Max' };
// objectStorage.add(max);
// objectStorage.add({ name: 'Manu' });
// objectStorage.remove(max);
// console.log(objectStorage.get());

interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(
    title: string,
    description: string,
    completeUntil: Date
) {
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = completeUntil;
    return courseGoal;
}

const names: Readonly<string[]> = ['Max', 'Anna'];
// names.push('Course');
// names.pop();

// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     role: [number, string];
// } = {
//     name: 'John',
//     age: 34,
//     hobbies: ['Sports', 'Cooking'],
//     role: [2, 'author'],
// };

enum Role {
    ADMIN,
    READ_ONLY,
    AUTHOR,
}

const person = {
    name: 'John',
    age: 34,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN,
};

// person.role.push('admin');
// person.role[1] = 10;
// person.role = [2, 'author', 'admin'];

let favoriteActivities: string[];
favoriteActivities = ['Sports'];

console.log(person.name);

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
}

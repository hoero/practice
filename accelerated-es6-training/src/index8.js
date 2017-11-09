// -------------------------------------------------------------------------
//region The Proxy API: Traps in Action

let person = {
    age: 27
};

let handler = {
    get(target, name) {
        return name in target ? target[name] : 'Non existant';
    }
};

let proxy = new Proxy(person, handler);

console.log(proxy.age);  // 27
console.log(proxy.name); // Non existant

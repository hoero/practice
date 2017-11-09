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

//endregion -------------------------------------------------------------------------
//region Proxies and Reflect

person = {
    age : 27,
    name: 'Max'
};

handler = {
    get(target, name) {
        return name in target ? target[name] : 'Non existant';
    },
    set(target, property, value) {
        if (value.length >= 2) {
            Reflect.set(...arguments);
        }
    }
};

proxy = new Proxy(person, handler);

console.log(proxy.name); // Max

proxy.name = 'M';
console.log(proxy.name); // Max

proxy.name = 'Maximilian';
console.log(proxy.name); // Maximilian
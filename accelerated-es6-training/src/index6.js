// -------------------------------------------------------------------------
//region The WeakMap

let cardAce = {
    name: 'Ace of Spades'
};

let cardKing = {
    name: 'King of Clubs'
};

let key1 = { a: 1 };
let key2 = { b: 2 };

let deck = new WeakMap();
deck.set(key1, cardAce);
deck.set(key2, cardKing);

console.log(deck.get(key1)); // {name: "Ace of Spades"}
console.log(deck.get(key2)); // {name: "King of Clubs"}

//endregion -------------------------------------------------------------------------
//region Sets

let set = new Set([1, 1, 1]);

set.add(2);

for (let key of set) { console.log(key); } // 1 2

console.log(set.has(2)); // true

for (let key of set.entries()) { console.log(key); } // [1, 1] [2, 2]
for (let key of set.keys()) { console.log(key); }    // 1 2
for (let key of set.values()) { console.log(key); }  // 1 2

set.delete(1);

for (let key of set) { console.log(key); } // 2

set.clear();
var person = {
    name        : '',
    age         : '',
    job         : '',
    presentation: function(style, timeOfDay) {
        if (style === 'formal') {
            console.log(`Good ${timeOfDay}, Ladies and gentlemen! I'm ${this.name}, I'm a ${this.job} and I'm ${this.age} years old.`);
        } else if (style === 'friendly') {
            console.log('Hey! What\'s up? I\'m ' + this.name + ', and I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.');
        }
    }
};

var john      = Object.create(person);
    john.name = 'John';
    john.age  = 26;
    john.job  = 'teacher';

// var john = {
//     name        : 'John',
//     age         : 26,
//     job         : 'teacher'
// };

// john.__proto__ = person;

// reflection
for (var prop in john) {
    console.log(prop + ': ' + john[prop]);
}
/**
 * Output:
 * name: John
 * age: 26
 * job: teacher
 * presentation: function (style, timeOfDay) {
        if (style === 'formal') {
            console.log(`Good ${timeOfDay}, Ladies and gentlemen! I'm ${this.name}, I'm a ${this.job} and I'm ${this.age} years old.`);
        } else if (style === 'friendly') {
            console.log('Hey! What\'s up? I\'m ' + this.name + ', and I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.');
        }
    }
 *
 *  So, this 'for in' actually reached out and grabbed every property and method not just on the object but also on the object's prototype.
 */


/**
 * But what if I just want to know what's on the object itself?
 * There's a way, there's a property on the base object called hasOwnProperty,
 * which you pass an argument and based on that it will tell you if the object really has this property,
 * maybe it's on the prototype chain or not, returning a boolean. 
 */

for (var prop in john) {
    if (john.hasOwnProperty(prop)) {
        console.log(prop + ': ' + john[prop]);
    }
}
/**
 * Output:
 * name: John
 * age: 26
 * job: teacher
 */

// --------------------------------------------------------------------------------------------------------- 
/**
 * Why properties of base Object does not shows in reflection using for in loop, if prototype chain leads to all the way to Object?
 * 
 * When listing the properties of an object 'all properties throughout the prototype chain' should be visible.
 * There is a configuration setting that can be set for each property associated with an object called 'data descriptors'.
 * One of these such descriptors is 'enumerable'.
 * Setting the enumerable data descriptor to either true or false
 * determines whether or not that property is revealed during enumeration (for in loop, Object.keys).
 * And it just so happens that none of the base Object properties is enumerable.
 * 
 * To test you can use a relatively new ES method:
 */

var o = {};

o.some_prop = true;

Object.defineProperty(o, 'name', {

    value: 'Jack',

    enumerable: false // this is the default

});

console.log(o.some_prop); // true

console.log(o.name);     // Jack

for(var prop in o) { console.log(prop); } // some_prop, ONLY!

/**
 * So adding a property using the member access operator gives a default enumerable property of true
 * whereas using Object.defineProperty sets the enumerable property of the property to false.
 * 
 * You can always test a property directly using another relatively new ES method:
 */

o.propertyIsEnumerable('name');          // false
o.propertyIsEnumerable('some_prop');     // true

Object.propertyIsEnumerable('toString'); // false
Object.propertyIsEnumerable('apply');    // false


// ---------------------------------------------------------------------------------------------------------
// Using underscoreJS: needs it to be able to work

var jane = {
    address: '111 Main St.',
    getName: function() { return this.name; }
};

var jim = {
    getJob: function() { return this.job; }
};

// extend
// _.extend(john, jane, jim);

console.log(john);

/**
 * john is what I want to extend, and then I can give it other objects.
 * And what this does is composes or combines these objects,
 * taking all the properties and methods of these other objects that I give it and adds them directly to john for me.
 * So, if I output john, you'll notice that he now has all properties and methods of the other objects as well of its owns,
 * and also its prototype which is the person object.
 */
// Scope Chain 1

function b() {
    console.log(myVar); // 1
}

function a() {
    var myVar = 2;

    console.log(myVar); // 2

    b();
}

var myVar = 1;
a();

// -------------------------------------------------------------------------
// Scope Chain 2

function a2() {

    function b2() {
        console.log(myVar2); // 2
    }

    var myVar2 = 2;
    
    console.log(myVar2); // 2
    
    b2();

}

var myVar2 = 1;
a2();

// -------------------------------------------------------------------------
// Scope Chain 3

function a3() {
    
    function b3() {
        console.log(myVar3); // 1
    }
    
    b3();

}

var myVar3 = 1;
a3();

// -------------------------------------------------------------------------
// Scope Chain 4

function a4() {

    function b4() {
        console.log(myVar4); // undefined
    }
    
    b4();

    var myVar4 = 2;

}

var myVar4 = 1;
a4();

// -------------------------------------------------------------------------
// Scope Chain 5, calling nested function from global

function a5() {
    
    function b5() {
        console.log(myVar5); // 10
    }

    a5.b5 = b5;

}

var myVar5 = 10;

a5(); // sets b on a


a5.b5(); // prints 10

// -------------------------------------------------------------------------
// Scope Chain 6, When the  inner function a is commented out the console logs 10, else it logs 1.

var a6 = 1;

function b6() {
    a6 = 10;

    return;
    
    function a6() {}
}

b6();
console.log(a6); // 1
 
/*  Explanation:
    var a6 = 1;

    function b6(){
    
    //function now hoisted to the top of b's scope, making name 'a' to be b's local variable
    function a6(){}

    console.log( typeof a6); // prints type as 'function' as 'a' is hoisted as a function in execution context of 'b'
    
    //'a' below no-longer refers to the global 'a' so it's just assigning/converting local hoisted function a to int 10
    a6 = 10; 

    console.log( typeof a6); //prints number as 'a' is assigned a value of 10
    
    //exit the function
    return;  

    }

    //if we invoke b as follows global variable 'a' is not changed
    b6();

    //will output 1
    console.log(a6);
*/

// -------------------------------------------------------------------------
// Scope Chain 7

var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo);
        console.log("outer func:  self.foo = " + self.foo);
        (function() {
            console.log("inner func:  this.foo = " + this.foo);
            console.log("inner func:  self.foo = " + self.foo);
        }());
    }
};

myObject.func();

/* Output:
    outer func:  this.foo = bar
    outer func:  self.foo = bar
    inner func:  this.foo = undefined
    inner func:  self.foo = bar
*/

/*  Why is it undefined?
    Because each function automatically receives a "this" when it's created, it doesn't need to go up any prototype chain — it just refers to the one it already has. Your IIFE isn't being called on any object so it's referring to the default window object and looking for a "foo" variable in the global scope. The "self" in the IIFE has to go up the prototype chain because there is no "self" in the IIFE.
 */
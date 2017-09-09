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

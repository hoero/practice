// ---------------------------------------------------------------------------------------------------------
// Closures

function buildFunctions() {
    
    var arr = [];

    for (var i = 0; i < 3; i++) {
        arr.push(function() {
            console.log(i);
        });
    }

    return arr;

}

var exe = buildFunctions();

exe[0](); // 3
exe[1](); // 3
exe[2](); // 3

// SOLUTION
function buildFunctions2() {
    
    var arr = [];

    for (var i = 0; i < 3; i++) {
        arr.push(
            (function(j) {
                return function() {
                    console.log(j);
                };
            }(i)) // Here you cant put ; , because it represents end of line and you cannot put it inside an array. So, syntax error.
        );
    }

    // Or

    // for (var i = 0; i < 3; i++) {
    //     (function() {
    //         var j = i;
            
    //         arr.push(
    //             function() {
    //                 console.log(j);
    //             }
    //         );
    //     }());
    // }

    // Or

    // for(var i = 0; i<3; i++){
    //     arr.push(
    //         function f() {
    //             console.log(f.val);
    //         }
    //     );
    //     arr[i].val=i;
    // }

    return arr;

}

var exe2 = buildFunctions2();

exe2[0](); // 0
exe2[1](); // 1
exe2[2](); // 2

// ES6 SOLUTION
function buildFunctions6() {
    
    var arr = [];
	
	for (let i = 0; i < 3; i++) {
		arr.push(function() {
			console.log(i);
		});
    }

    // Or

    // for (var i = 0; i < 3; i++) {
    //     let j = i;

    //     arr.push(function() {
    //         console.log(j);
    //     });
    // }

    return arr;

}

var exe6 = buildFunctions6();

exe6[0](); // 0
exe6[1](); // 1
exe6[2](); // 2
// -------------------------------------------------------------------------
//region Creating & Resolving Promises

let promise = new Promise(( resolve, reject ) => {
    setTimeout(() => {
        resolve('Done');
    }, 1500);
});

promise.then(value => console.log(value) ); // Done

//endregion -------------------------------------------------------------------------
//region Rejecting Promises

promise = new Promise(( resolve, reject ) => {
    setTimeout(() => {
        reject('Failed!!!');
    }, 1500);
});

promise.then( value => console.log(value), error => console.log(error) );  // Failed!!!

//endregion -------------------------------------------------------------------------
//region Chaining Promises

function waitASecond(seconds) {
    return new Promise(( resolve, reject ) => {
        setTimeout(() => {
            seconds++;
            resolve(seconds);
        }, 1000);
    });
}

waitASecond(0)
    .then(waitASecond)
    .then(seconds => console.log(seconds)) // 2

//endregion -------------------------------------------------------------------------
//region Catching Errors

function waitASecond2(seconds) {
    return new Promise(( resolve, reject ) => {
        if (seconds > 2) {

            reject('Rejected!');

        } else {

            setTimeout(() => {
                seconds++;
                resolve(seconds);
            }, 1000);

        }
    });
}

waitASecond2(2)
    .then(waitASecond2)
    .then(seconds => console.log(seconds))
    .catch(error  => console.log(error))   // Rejected!'
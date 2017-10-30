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
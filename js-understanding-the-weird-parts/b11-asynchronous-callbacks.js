// Long running function
function wait3Seconds() {

    // gets us the exact time 3 seconds from now. 'new Date().getTime()' will get us the exact current time in milliseconds and we add 3000 milliseconds to that (i.e. 3 seconds).
    var ms = 3000 + new Date().getTime();

    /*
    while (new Date() < ms) {}
    
    means that while will keep looping and every time it loops it will call 'new Date()' meaning it gets the current date/time. It will keep looping as long as the current date/time is less than what we calculated to be 3 seconds from now.

    The loop will loop a lot of times (more than 3000), but the key is that we tell the loop to keep looking while 'new Date()' is less than 'ms', or in other words: 'keep looping as long as the current date/time is less than ms' and ms was what we calculated as '3 seconds in the future'.

    So the while loop keeps looping for 3 seconds.
    */
    while (new Date() < ms) {}

    console.log('Finished function');

}

function clickHandler() {
    console.log('Click event!');
}

// listens for the click event
document.addEventListener('click', clickHandler);

wait3Seconds();
console.log('Finished execution');
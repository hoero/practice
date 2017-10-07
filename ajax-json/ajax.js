// -------------------------------------------------------------------------
// Explore how to use AJAX and get started creating Dynamic JavaScript

// Object creation
const httpRequest = new XMLHttpRequest();
// console.log(httpRequest);

// readyState
httpRequest.onreadystatechange = changeMe;

// Connection with external file
httpRequest.open( 'GET', 'ajax-json/test.txt', true );
httpRequest.send();
// console.log(httpRequest);

function changeMe() {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {

        // Put it in the HTML, remember to put <div id="output"></div> in body
        document.getElementById('output').innerHTML = httpRequest.responseText;

        console.log(httpRequest);
        console.log(httpRequest.responseText);

    } else {

        console.log('Not ready yet :(');

    }

    // console.log(httpRequest.readyState);
    /**
     * 0 -> starting point
     * 1 -> loading
     * 2 -> loaded
     * 3 -> interacting
     * 4 -> completed
     */
}
// -------------------------------------------------------------------------
// Explore how to use AJAX and get started creating Dynamic JavaScript

/**
 * This is function is essentially kind of like a document ready,
 * which just waits for the DOM to load, before we try to fire this off.
 * So it's a good practice to make sure we're ready to go
 * before we actually try to fire off and connect with the DOM information.
 */
(function() {
    // Remember to put <button id="btn">Click Me</button> in body
    document.getElementById('btn').onclick = showData;

    function showData() {
        // Object creation
        const httpRequest = new XMLHttpRequest();

        // readyState
        httpRequest.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {

                // Put it in the HTML, remember to put <div id="output"></div> in body
                document.getElementById('output').innerHTML = this.responseText;

                console.log(this.responseText);

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
        };
        
        // Connection with external file
        httpRequest.open( 'GET', 'ajax-json/test.txt', true );
        httpRequest.send();
    }
}());
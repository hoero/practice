// ---------------------------------------------------------------------------------------------------------
/**
 * To test tocToc framework/library
 * 
 * It needs this in the HTML for jQuery usage :
 * 
 * <div id="logindiv">
        <select id="lang">
            <option value="en">English</option>
            <option value="es">Spanish</option>
        </select>
        <input type="button" value="Login" id="login" />
*   </div>
*   <h1 id='greeting'></h1>
*   
*   <script
        src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha256-k2WSCIexGzOj3Euiig+TlR8gA0EmPjuc79OEeY5L45g="
        crossorigin="anonymous"></script>
*   <script src="js-understanding-the-weird-parts/toctoc.js"></script>
*   <script src="js-understanding-the-weird-parts/j-app.js"></script>
 */

// Gets a new object (the architecture allows us to not have to use the 'new' keyword here)
var ring = tt('Hoeru', 'Oriba');
console.log(ring);

// Use our chainable methods
ring.greet().setLanguage('es').greet(true).log();

// Let's use our object on the click of the login button
$('#login').click(function() {
    
    // Creates a new 'tocToc object (let's pretend we know the name from the login)
    var loginGreeter = tt('Hoeru', 'Oriba');

    // Hides the login on the screen
    $('#logindiv').hide();

    // Fires off an HTML greeting, passing the '#greeting' as a selector and the chosen language, 
    // and logs the welcome as well 
    loginGreeter.setLanguage($('#lang').val()).DOMgreet('#greeting', true).log();
    
});
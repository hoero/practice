// ---------------------------------------------------------------------------------------------------------
/**
 * tocToc (¡Toc, toc! onomatopeya para llamar a la puerta) -> greeting framework
 * 
 * Lets say we wanted to build a library or framework that helps us give greetings.
 * Maybe for when I'm on a website and someone logs in I can show them a greeting after they logged in in the upper right corner.
 * And maybe a I'd like to do it In different languages, depending on what language they choose, their preferred language in the app.
 * 
 * Official requirements:
 * 
 * • When given a first name, last name, and optional language, it generates formal and informal greetings.
 * 
 * • Support English and Spanish languages.
 * 
 * • It should be reusable, meaning that it wont interfere with any other JS code in my app, and someone else can just grab it and use it in their apps.
 * 
 * • And even is called tocToc I'd like an easy type structure, like 'tt()'.
 * 
 * • All my developers use jQuery on a lot of their projects, so it should also support jQuery.
 *   Even though it returns greeting what we'd like is to be able to give it a jQuery object that points at some HTML element,
 *   and it'll fill that element with the greeting. 
 * 
 *   So I could just pass my tocToc, let's say a div or a span in my HTML that just contains text.
 *   And it'll fill that with my appropriate greeting text.
 */

(function(global, $) {

    // Sets up the tocToc object and returns it, making a 'new' object
    const tocToc = function(firsrtName, lastName, language) {
 
        return new tocToc.init(firsrtName, lastName, language);
        
    };

    // Private variables, hidden within the scope of the IIFE and never directly accessible
    const supportedLangs  = ['en', 'es'],
          // Informal
          greetings       = { en: 'Hello', es: 'Hola' },
          formalGreetings = { en: 'Greetings', es: 'Saludos' },
          // Logger messages
          logMessages     = { en: 'Logged in', es: 'Inició Sesión' };
    
    // tocToc prototype, holds methods (to save memory space)
    tocToc.prototype = {

        fullName: function() {
            // 'this' refers to the calling object at execution time
            return `${this.firsrtName} ${this.lastName}`;
        },

        // Checks that is a valid language
        // References the externally inaccessible 'supportedLangs' within the closure
        validate: function() {
            if (supportedLangs.indexOf(this.language) === -1) {
                throw 'Invalid language.';
            }
        },

        // Retrieve messages from object by referring to properties using [] syntax
        greeting: function() {
            return `${greetings[this.language]} ${this.firsrtName}!`;
        },

        formalGreeting: function(params) {
            return `${formalGreetings[this.language]}, ${this.fullName()}`;
        },

        // Determines the kind of message
        isFormal: function(isIt) {
            // if undefined or null, it will be coerced to 'false'
            let greeting = (isIt) ? this.formalGreeting() : this.greeting();

            return greeting;
        },

        // Chainable methods return their own containing object
        greet: function(formal) {
            var msg = this.isFormal(formal);

            // It logs it to the console. IE actually doesnt have a console variable unless its console is open.
            // With this I'm making sure that it is by saying if (window.console). If it's undefined, it will be coerced to false.
            // So as long as I have a console object available, I'll console.log.
            if (global.console) {
                console.log(msg);
            }

            // 'this' refers to the calling object at execution time
            // Makes the method chainable
            return this;
        },

        // Manually make sure something is logged
        log: function() {
            if (global.console) {
                console.log(`${logMessages[this.language]}: ${this.fullName()}`);
            }

            // Make chainable
            return this;
        },

        // Changes the language on the fly
        setLanguage: function(lang) {
            // Sets the language
            this.language = lang;

            // Validates it
            this.validate();

            // Make chainable
            return this;
        }

    };

    // tocToc function constructor, the actual object is created here,
    // allowing us to 'new' an object without calling 'new'
    tocToc.init = function(firsrtName = '', lastName = '', language = 'en') {

        this.firsrtName = firsrtName;
        this.lastName   = lastName;
        this.language   = language;
        
        this.validate();

    };

    // Sets init protorype to be tocToc's, trick borrowed from jQuery
    // so we don't have to use the 'new' keyword
    tocToc.init.prototype = tocToc.prototype;

    // Exposes tocToc and the alias 'tt' to the global environment,
    // attaching our Greetr to the global object,
    // and provide a shorthand 'tt' for ease our poor fingers
    global.tocToc = global.tt = tocToc;
    
}(window, jQuery));
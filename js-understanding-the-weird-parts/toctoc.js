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

(function(global, obj) {

    // Sets up the tocToc object and returns it
    var tocToc = function(firsrtName, lastName, language) {
        
        return new tocToc.init(firsrtName, lastName, language);
        
    };

    // tocToc prototype, where methods are located
    tocToc.prototype = {};

    // tocToc function constructor
    tocToc.init = function(firsrtName, lastName, language) {

        var self = this;

        self.firsrtName = firsrtName || '';
        self.lastName   = lastName || '';
        this.language   = language || 'en';
        
    };

    // Sets init protorype to be tocToc's
    tocToc.init.prototype = tocToc.prototype;

    // Exposes tocToc and the alias tt to the global environment
    global.tocToc = global.tt = tocToc;
    
}(window, jQuery));
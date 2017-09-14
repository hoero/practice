// ---------------------------------------------------------------------------------------------------------
// self = this

var normal = {
    name: 'The normal object',
    log: function () {
        this.name = 'Updated normal object';

        console.log(this); // {name: "Updated normal object", log: ƒ}

        var setName = function (newName) {
            this.name = newName; // The 'this' of this nested function points to the global object, instead to this (normal) object
        }

        setName('Updated again! The normal object');

        console.log(this); // {name: "Updated normal object", log: ƒ}
    }
};

normal.log();

// ---------------------------------------------------------------------------------------------------------
// self = this : A common pattern use to fix the problem (showed above) with nested functions in a method 

var fixed = {
    name: 'The fixed object',
    log: function () {
        var self = this;

        self.name = 'Updated fixed object';

        console.log(self); // {name: "Updated fixed object", log: ƒ}

        var setName = function (newName) {
            self.name = newName;
        }

        setName('Updated again! The fixed object');

        console.log(self); // {name: "Updated again! The fixed object", log: ƒ}
    }
};

fixed.log();
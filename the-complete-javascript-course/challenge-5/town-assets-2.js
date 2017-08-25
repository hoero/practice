/////////////////////////////////
// CODING CHALLENGE
/*
Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets
It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.
At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of town parks (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal
All the report data should be printed to the console.
HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.
*/

// 1. Report machine
    const reportMachine = {

        // 1.1 Town assets
        townParks  : [],
        townStreets: [],

        // 1.2 Calculate age
        calcAge: function calcAge() {
            return new Date().getFullYear() - this.buildYear;
        },

        // 1.3 Make age list
        ages: function ages(array) {
            return this[array].map((current) => current.calcAge());
        },

        // 1.4 Make length list
        lengths: function lengths(array) {
            return this[array].map((current) => current.length);
        },

        // 1.5 Calculate total and average of any asset
        totalAverage: function calcTotalAge(array) {
            const sum = array.reduce((previous, current) => previous + current);

            return [sum.toFixed(2), (sum / array.length).toFixed(2)];
        },
        
        // 1.6 Determine street size
        streetSize: function streetSize(value) {
            const size = new Map();
            size.set('t', 'tiny');
            size.set('s', 'small');
            size.set('n', 'normal');
            size.set('b', 'big');
            size.set('h', 'huge');

            return size.get(value);
        },

        // 1.7 Generate report of town assets
        generate: function generate() {

          // If a parks array with elements is available
          if (this.townParks.length > 0) {

            // Get total and average age
            const [total, average] = this.totalAverage(this.ages('townParks'));
             
            // Display it
            console.log(`----PARKS REPORT----\nOur ${this.townParks.length} parks have an average age of ${average} years.`);

            this.townParks.forEach((current) => console.log(`${current.name} has a tree density of ${current.treeDensity} trees per square km.`));

            // If it's equal to true, it will show the park(s) with more than 1000 trees
            for (const current of this.townParks) {

                if (current.trees > 1000) {
                    console.log(`${current.name} has more than 1000 trees.`);
                }

            }

          }
          
          // If a streets array with elements is available
          if (this.townStreets.length > 0) {

            // Get total and average length of the town's streets
            const [total, average] = this.totalAverage(this.lengths('townStreets'));

            // All streets
            console.log(`----STREETS REPORT----\nOur ${this.townStreets.length} streets have a total length of ${total} km, with an average of ${average} km.`);

            // Each street
            for (const current of this.townStreets) {
                console.log(`${current.name}, built in ${current.buildYear}, is a ${this.streetSize(current.size)} street.`);
            }
              
          }
            
        }
        
    }

// 2. Classes for town assets (parks and streets)
    // 2.1 Town asset superclass
    const TownAsset = function (name, buildYear) {
        this.name      = name;
        this.buildYear = buildYear;
    }

    // 2.2 Add parks function
    const addPark = function (name, buildYear, trees, area) {
        
        // Set park inheritance object
        const park = Object.create(reportMachine);
        
        // Inheritance from TownAsset
        TownAsset.call(park, name = `${name} Park`, buildYear);

        park.trees       = trees;
        park.area        = area;
        park.treeDensity = trees / area;
        
        // Add park to parks array 
        reportMachine.townParks.push(park);

    }

    // 2.3 Add streets function
    const addStreet = function (name, buildYear, length, size = 'n') {

        // Set street inheritance object
        const street = Object.create(reportMachine);
        
        // Name base on size
        if (size === 't' || size === 's' || size === 'n') { // t = tiny, s = small, n = normal

            // Inheritance from TownAsset
            TownAsset.call(street, name = `${name} Street`, buildYear);

        } else if (size === 'b') { // b = big

            // Inheritance from TownAsset
            TownAsset.call(street, name = `${name} Avenue`, buildYear);

        } else if (size === 'h') { // h = huge

            // Inheritance from TownAsset
            TownAsset.call(street, name = `${name} Boulevard`, buildYear);

        }

        street.length = length;
        street.size   = size;
        
        // Add street to streets array 
        reportMachine.townStreets.push(street);
        
    }

// 3. Create assets
    // 3.1 Parks
    addPark('Green', 1947, 950, 1900);
    addPark('National', 1917, 2500, 5000);
    addPark('Oak', 1967, 800, 1600);

    // 3.2 Streets
    addStreet('Ocean', 1999, 2, 'b');
    addStreet('Evergreen', 2008, 1, 's');
    addStreet('4th', 2015, 1.5);
    addStreet('Sunset', 1982, 2.5, 'h');

// 4. Show report of town assets
    reportMachine.generate();
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

// 1. Classes for town assets (parks and streets)
    class TownAsset {
        
        constructor(name, buildYear) {
            this.name      = name;
            this.buildYear = buildYear;
        }

        // Determine age
        age() { return new Date().getFullYear() - this.buildYear; }

        // Calculate total and average of any asset
        static totalAverage(array) {
            const sum = array.reduce((previous, current) => previous + current);
    
            return [sum.toFixed(2), (sum / array.length).toFixed(2)];
        }

    }
    
    class Park extends TownAsset {

        constructor(name, buildYear, trees, area, whereToPush = townParks) {
            super(name = `${name} Park`, buildYear);
            this.trees = trees;
            this.area  = area;

            // Add park to array 
            whereToPush.push(this);
        }

        // Determine the tree density of the park
        treeDensity() { return this.trees / this.area; }

    }

    class Street extends TownAsset {
        
        constructor(name, buildYear, length, size = 'n', whereToPush = townStreets) {
            // Name base on size
            if (size === 't' || size === 's' || size === 'n') { // t = tiny, s = small, n = normal
                
                super(name = `${name} Street`, buildYear);

            } else if (size === 'b') { // b = big

                super(name = `${name} Avenue`, buildYear);

            } else if (size === 'h') { // h = huge

                super(name = `${name} Boulevard`, buildYear);

            }

            this.length = length;
            this.size   = size;

            // Add street to array 
            whereToPush.push(this);
        }
        
        // Determine size
        streetSize(value) {
            const size = new Map();
            size.set('t', 'tiny');
            size.set('s', 'small');
            size.set('n', 'normal');
            size.set('b', 'big');
            size.set('h', 'huge');

            return size.get(value);
        }

    }

// 2. Create assets
    // 2.1 Parks
    const townParks = [];
    const park1     = new Park('Green', 1947, 950, 1900);
    const park2     = new Park('National', 1917, 2500, 5000);
    const park3     = new Park('Oak', 1967, 800, 1600);

    // 2.2 Streets
    const townStreets = [];
    const street1     = new Street('Ocean', 1999, 2, 'b');
    const street2     = new Street('Evergreen', 2008, 1, 's');
    const street3     = new Street('4th', 2015, 1.5);
    const street4     = new Street('Sunset', 1982, 2.5, 'h');

// 3. Show the report of town assets
    const report = function (parksArray, streetsArray) {

        // If a parks array is provided
        if (parksArray !== undefined) {

            // Get total and average age
            const ages             = parksArray.map((current) => current.age());
            const [total, average] = TownAsset.totalAverage(ages);

            // Display it
            console.log(`----PARKS REPORT----\nOur ${parksArray.length} parks have an average age of ${average} years.`);

            parksArray.forEach((current) => console.log(`${current.name} has a tree density of ${current.treeDensity()} trees per square km.`));
            
            // If it's equal to true, it will show the park(s) with more than 1000 trees
            for (const current of parksArray) {
                
                if (current.trees > 1000) {
                    console.log(`${current.name} has more than 1000 trees.`);
                }

            }
            
        }
        
        // If a streets array is provided
        if (streetsArray !== undefined) { 

            // Get total and average length of the town's streets
            const lengths                      = streetsArray.map((current) => current.length);
            const [totalLength, averageLength] = TownAsset.totalAverage(lengths);

            // All streets
            console.log(`----STREETS REPORT----\nOur ${streetsArray.length} streets have a total length of ${totalLength} km, with an average of ${averageLength} km.`);

            // Each street
            for (const current of streetsArray) {
                console.log(`${current.name}, built in ${current.buildYear}, is a ${current.streetSize(current.size)} street.`);
            }
            
        }
        
    }

    // 3.1 Show it!!!
    report(townParks, townStreets);
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

    // Calculate age
    static calcAge(element) { return new Date().getFullYear() - element.buildYear; }

    // Make age list
    static ages(array) { return array.map((current) => this.calcAge(current)); }

    // Make length list
    static lengths(array) { return array.map((current) => current.length); }

    // Calculate total and average of any asset
    static totalAverage(array) {
        const sum = array.reduce((previous, current) => previous + current);

        return [sum.toFixed(2), (sum / array.length).toFixed(2)];
    }
    
    // Determine street size
    static streetSize(value) {
        const size = new Map();
        size.set('t', 'tiny');
        size.set('s', 'small');
        size.set('n', 'normal');
        size.set('b', 'big');
        size.set('h', 'huge');

        return size.get(value);
    }

    // Generate report of town assets
    static report() {

      // If a parks array with elements is available
      if (townParks.length > 0) {

        // Get total and average age
        const [total, average] = this.totalAverage(this.ages(townParks));
         
        // Display it
        console.log(`----PARKS REPORT----\nOur ${townParks.length} parks have an average age of ${average} years.`);

        townParks.forEach((current) => console.log(`${current.name} has a tree density of ${current.treeDensity} trees per square km.`));

        // If it's equal to true, it will show the park(s) with more than 1000 trees
        for (const current of townParks) {

            if (current.trees > 1000) {
                console.log(`${current.name} has more than 1000 trees.`);
            }

        }

      }
      
      // If a streets array with elements is available
      if (townStreets.length > 0) {

        // Get total and average length of the town's streets
        const [total, average] = this.totalAverage(this.lengths(townStreets));

        // All streets
        console.log(`----STREETS REPORT----\nOur ${townStreets.length} streets have a total length of ${total} km, with an average of ${average} km.`);

        // Each street
        for (const current of townStreets) {
            console.log(`${current.name}, built in ${current.buildYear}, is a ${this.streetSize(current.size)} street.`);
        }
          
      }
        
    }
    
}

class Park extends TownAsset {
    constructor(name, buildYear, trees, area, whereToPush = townParks) {
        super(name = `${name} Park`, buildYear);
        this.trees       = trees;
        this.area        = area;
        this.treeDensity = trees / area;

        // Add park to array
        whereToPush.push(this);
    }
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
} 

// 3. Create assets
    // 3.1 Parks
    const townParks = [];
    const park1     = new Park('Green', 1947, 950, 1900);
    const park2     = new Park('National', 1917, 2500, 5000);
    const park3     = new Park('Oak', 1967, 800, 1600);

    // 3.2 Streets
    const townStreets = [];
    const street1     = new Street('Ocean', 1999, 2, 'b');
    const street2     = new Street('Evergreen', 2008, 1, 's');
    const street3     = new Street('4th', 2015, 1.5);
    const street4     = new Street('Sunset', 1982, 2.5, 'h');

// 4. Show report of town assets
    TownAsset.report();
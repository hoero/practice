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

    }
    
    class Park extends TownAsset {

        constructor(name, buildYear, trees, area) {
            super(name = `${name} Park`, buildYear);
            this.trees = trees;
            this.area  = area;
        }

        // All calculations, instead of having them separately
        calc() {
            // Determine the tree density of the park
            const treeDensity = this.trees / this.area;
            
            // Determine if the park has more than 1k trees 
            const park1k = (this.trees > 1000) ? [true, this.name] : [false, this.name];

            // Determine age
            const age = new Date().getFullYear() - this.buildYear;

            // Return all values
            return [treeDensity, park1k, age];
        }

        // Get all values
        get() {
            const [treeDensity, park1k, age] = this.calc();
            const [boolean, name]            = park1k;

            // Return all values
            return [treeDensity, age, boolean, name];
        }

    }

    class Street extends TownAsset {
        
        constructor(name, buildYear, length, size = 'normal') {

            // Name base on size
            if (size === 'tiny' || size === 'small' || size === 'normal') {
                
                super(name = `${name} Street`, buildYear);

            } else if (size === 'big') {

                super(name = `${name} Avenue`, buildYear);

            } else if (size === 'huge') {

                super(name = `${name} Boulevard`, buildYear);

            }

            this.length = length;
            this.size   = size;
        }

    }

// 2. Create assets
    // 2.1 Parks
        // Green Park
        const park1                                                 = new Park('Green', 1947, 950, 1900);
        const [park1TreeDensity, park1Age, park1Boolean, park1Name] = park1.get();

        // National Park
        const park2                                                 = new Park('National', 1917, 2500, 5000);
        const [park2TreeDensity, park2Age, park2Boolean, park2Name] = park2.get();

        // Oak Park
        const park3                                                 = new Park('Oak', 1967, 800, 1600);
        const [park3TreeDensity, park3Age, park3Boolean, park3Name] = park3.get();
        
        // Town parks
        const townParks = new Map();
        townParks.set(park1Name, park1TreeDensity);
        townParks.set(park1Age, 'value associated with park1Age');
        townParks.set(park1Boolean, park1Name);
        townParks.set(park2Name, park2TreeDensity);
        townParks.set(park2Age, 'value associated with park2Age');
        townParks.set(park2Boolean, park2Name);
        townParks.set(park3Name, park3TreeDensity);
        townParks.set(park3Age, 'value associated with park3Age');
        townParks.set(park3Boolean, park3Name);

    // 2.2 Streets
        const street1 = new Street('Ocean', 1999, 2, 'big');
        const street2 = new Street('Evergreen', 2008, 1, 'small');
        const street3 = new Street('4th', 2015, 1.5);
        const street4 = new Street('Sunset', 1982, 2.5, 'huge');

        // Town streets
        const townStreets = new Map();
        townStreets.set(street1.name, [street1.length, street1.buildYear, street1.size]);
        townStreets.set(street2.name, [street2.length, street2.buildYear, street2.size]);
        townStreets.set(street3.name, [street3.length, street3.buildYear, street3.size]);
        townStreets.set(street4.name, [street4.length, street4.buildYear, street4.size]);

// 3. Determine parks quantity and calculate parks ages
    const parksAndAge = function(parksMap) {

        let parks = 0, ages = 0;
        
        parksMap.forEach((value, key) => {

            // Determine parks quantity
            if (typeof(key) === 'string') {
                if (key.includes('Park')) {
                    parks++;
                }
            }

            // Calculate parks ages
            if (typeof(key) === 'number') { ages += key; }
            
        });

        // Return number of parks and the average age of town parks
        return [parks, ages / parks];

    }

// 4. Number of streets, and total and average length of the town's streets
    const streetsTotalAverageLength = function (streetsMap) {

        let streets = streetsMap.size, totalLength = 0;
        
        streetsMap.forEach((value, key) => {
            if (typeof(key) === 'string') {

                // Total length
                totalLength += value[0];

            }
        })

        // Return number of streets, and total and average length of the town's streets
        return [streets, totalLength,  totalLength / streets]

    }

// 5. Show the report of town assets
    const report = function (parksMap, streetsMap) {

        /*
        REPORT FORMAT:
            ----PARKS REPORT----
            Our 3 parks have an average age of 73.33333333333333 years.
            Green Park has a tree density of 0.5 trees per square km.
            National Park has a tree density of 0.5 trees per square km.
            Oak Park has a tree density of 0.5 trees per square km.
            National Park has more than 1000 trees.
            ----STREETS REPORT----
            Our 4 streets have a total length of 7 km, with an average of 1.75 km.
            Ocean Avenue, built in 1999, is a big street.
            Evergreen Street, built in 2008, is a small street.
            4th Street, built in 2015, is a normal street.
            Sunset Boulevard, built in 1982, is a huge street.

            If is inside the same loop (1th):
                ----PARKS REPORT----
                Our 3 parks have an average age of 73.33333333333333 years.
                Green Park has a tree density of 0.5 trees per square km.
                National Park has a tree density of 0.5 trees per square km.
                National Park has more than 1000 trees.
                Oak Park has a tree density of 0.5 trees per square km.
        */

        // If a parks map is provided
        if (parksMap !== undefined) {
            
            // Get number of parks and the average age of town parks
            const [parks, averageAge] = parksAndAge(parksMap);

            // Display it
            console.log(`----PARKS REPORT----\nOur ${parks} parks have an average age of ${averageAge} years.`);

            // If it's a string, it will show that line
            parksMap.forEach((value, key) => {

                if (typeof(key) === 'string') {
                    if (key.includes('Park')) {
                        console.log(`${key} has a tree density of ${value} trees per square km.`)
                    }
                }

            });
            
            // (1th) If it's equal to true, it will show that park(s) with more than 1000 trees
            for (let [key, value] of parksMap.entries()) {

                // For less code, this could be in the same loop that is above. But it will appear next to the same park (key) that has 'true', which is not the desire format of the report.
                if (key === true) {
                    console.log(`${value} has more than 1000 trees.`);
                }

            }
            
        }
        
        // If a streets map is provided
        if (streetsMap !== undefined) { 

            // Get number of streets, and total and average length of the town's streets
            const [streets, totalLength, averageLength] = streetsTotalAverageLength(streetsMap);

            // All streets
            console.log(`----STREETS REPORT----\nOur ${streets} streets have a total length of ${totalLength} km, with an average of ${averageLength} km.`);

            // Each street
            for (let [key, value] of streetsMap.entries()) {
                console.log(`${key}, built in ${value[1]}, is a ${value[2]} street.`);
            }
            
        }
        
    }

    // 5.1 Show it!!!
    report(townParks, townStreets);
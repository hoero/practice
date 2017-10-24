// -------------------------------------------------------------------------
//region Modules
import * as imported from "./external";

console.log(imported); // Object

console.log(imported.keyValue); // 1000

imported.test(); // Tested!

console.log(imported.keyValue); // 2000

console.log(imported.default); // Some text

//endregion -------------------------------------------------------------------------
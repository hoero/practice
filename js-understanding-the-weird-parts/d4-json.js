var objectLiteral = {
    firstName    : 'Mary',
    isAProgrammer: true
}

/*  XML
    <object>
        <firstName> Mary</firstName>
        <isAProgrammer>true</isAProgrammer>
    </object>   
*/

/*  JSON
    {
        "firstName"    : "Mary",
        "isAProgrammer": true
    }
*/

console.log(JSON.stringify(objectLiteral)); // {"firstName":"Mary","isAProgrammer":true}

var jsonValue = JSON.parse('{ "firstName" : "Mary", "isAProgrammer": true }');

console.log(jsonValue); // {firstName: "Mary", isAProgrammer: true}
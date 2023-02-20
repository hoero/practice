var userInput;
var userName;
userInput = 50;
userInput = 'John';
if (typeof userInput === 'string') {
    userName = userInput;
}
function generateError(message, code) {
    throw { message: message, code: code };
}
generateError('An error ocurred!', 500);

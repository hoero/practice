let userInput: unknown;
let userName: string;

userInput = 50;
userInput = 'John';
if (typeof userInput === 'string') {
    userName = userInput;
}

function generateError(message: string, code: number): never {
    throw { message: message, code: code };
}

generateError('An error ocurred!', 500);

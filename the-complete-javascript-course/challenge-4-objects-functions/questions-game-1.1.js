/////////////////////////////
// CODING CHALLENGE
/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
    a) question itself
    b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
    c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each answer should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).

--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/

{ // Private code (step 7)

    // 1. Class (step 1)
        class Question {

            constructor(question, answers, correct, whereToPush = questions) {
                this.question = question;
                this.answers  = answers;
                this.correct  = correct;

                // Add question to array
                whereToPush.push(this);
            }

            // Display question and answers (step 4)
            display() {
                console.log(this.question);

                for (const [key, value] of this.answers.entries()) {
                    console.log(`${key}: ${value}`);
                }
            }

            // Check if the answer is correct and print to the console whether the answer is correct or not (step 6)
            checkAnswer(answer, callback) {
                let score = callback();

                if (answer === this.correct) {

                    console.log('Correct answer!');

                    // Add 1 point to the score (step 10)
                    score = callback(true);

                } else { console.log('Wrong answer. Try again :)'); }

                Question.displayScore(score);
            }

            // Track the user's score (step 10)
            static score() {
                let score = 0;

                return function (correct) {
                    if (correct) {
                        // Add 1 point to the score
                        score++;
                    }
                    return score;
                }
            }

            // Display the score in the console (step 11)
            static displayScore(value) {
                console.log(`Your current score is ${value}`);
                console.log('------------------------------');
            }

        }

    // 2. Questions (step 2)
        // Score (in here so it maintains the value) and array for storage (step 3 and 10)
        let   keepScore = Question.score();
        const questions = [];

        const q1 = new Question('Is JavaScript the coolest programming language in the world?', ['Yes', 'No'], 0);

        const q2 = new Question('What is the name of this course\'s teacher?', ['John', 'Michael', 'Jonas'], 2);

        const q3 = new Question('What does best describe coding?', ['Boring', 'Hard', 'Fun', 'Tedious'], 2);

    // 3. Display random question with answers (step 8)
        function nextQuestion() {

            // Random number (step 4)
            let random = Math.floor(Math.random() * questions.length);
    
            // Display it (step 4)
            questions[random].display();
    
            // Ask question (step 5)
            const answer = prompt('Please select the correct answer. Write "exit" to exit game.');

            if (answer !== 'exit') { // (step 9)
                // Check answer (step 6)
                questions[random].checkAnswer(parseInt(answer), keepScore);
                    
                nextQuestion(); // (step 8)
            }
            
        }

        // 3.1 Display it
        nextQuestion();

}
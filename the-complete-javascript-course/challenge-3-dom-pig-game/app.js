/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/


var scores,
    roundScore,
    activePlayer,
    gamePlaying,
    i,
    dice6   = [],
    diceDOM = document.getElementsByClassName('dice');

// Initialize game
init();

// Get element by id
function getID(id) {
    return document.getElementById(id);
}

// Initialize game function
function init() {

    // Initial values
    scores       = [0, 0];
    roundScore   = 0;
    activePlayer = 0;
    // Set the state variable, this variable simply tell us the condition of a system, Is it active or not?
    gamePlaying  = true;

    for (i = 0; i < diceDOM.length; i++) {
        // Hide dice img at the beginning
        diceDOM[i].style.display = 'none';
    }

    for (i = 0; i < 2; i++) {
        // Set values to 0 in the UI
        getID('score-' + i).textContent   = '0';
        getID('current-' + i).textContent = '0';

        // Set players names
        getID('name-' + i).textContent = 'Player ' + i;

        // Set correct classes
        document.querySelector('.player-' + i + '-panel').classList.remove('winner');
        document.querySelector('.player-' + i + '-panel').classList.remove('active');
    }

    // Activate first player 
    document.querySelector('.player-0-panel').classList.add('active');

    /* Another solution
    if (document.querySelector('.player-1-panel').classList.contains('active')) {
      document.querySelector('.player-0-panel').classList.add('active');
      document.querySelector('.player-1-panel').classList.remove('active');
    }
    */

}

// Change player: variable + UI 
function nextPlayer() {
    
    // activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    // document.querySelector('.player-0-panel').classList.toggle('active');
    // document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

    activePlayer = activePlayer === 0 ? 1 : 0;    

    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');

    // Set current score to 0: variable + UI 
    roundScore = 0;
    
    for (i = 0; i < 2; i++) {
        getID('current-' + i).textContent = '0';
    }

    for (i = 0; i < diceDOM.length; i++) {
        // Hide dice img
        diceDOM[i].style.display = 'none';
    }

    // Reset dice6
    dice6 = [];
    // console.log(dice6, 'it\'s empty');

}

// New game function
document.querySelector('.btn-new').addEventListener('click', init);

// Roll dice function
document.querySelector('.btn-roll').addEventListener('click', function () {

    if (!gamePlaying) {
        return false;
    }

    // 1. Random number + other variables
        var dice = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
        // console.log(dice);
    
    // 2. Display the result
        for (i = 0; i < diceDOM.length; i++) {
            // Show dice img
            diceDOM[i].style.display = 'block';
        }

        // Change dice img related to dice value
        diceDOM[0].src = 'dice-' + dice[0] + '.png';
        diceDOM[1].src = 'dice-' + dice[1] + '.png';
    
    // 3. Update the round score IF the rolled number was NOT a 1
        if (dice[0] !== 1 && dice[1] !== 1) {
            
            // Add score
            roundScore += dice[0] + dice[1];

            // Display added score
            getID('current-' + activePlayer).textContent = roundScore;

        } else {

            // Change player
            nextPlayer();

        }

    // 4. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
        if (dice[0] === 6 && dice[1] === 6) {
            // Store dice value when it's a 6
            dice6.push(dice[0]);
            dice6.push(dice[1]);
            // console.log(dice6, 'first 6');
        }
        
        if (dice6.length === 2 && scores[activePlayer] > 0) {

            // console.log(dice6, 'it has two 6');

            // Set current score to 0: variable + UI 
            roundScore = 0;
            scores[activePlayer] = roundScore;

            getID('score-' + activePlayer).textContent   = '0';
            getID('current-' + activePlayer).textContent = '0';

            // Change player
            nextPlayer();
            
        }

});

// Hold function
document.querySelector('.btn-hold').addEventListener('click', function () {

    if (!gamePlaying) {
        return false;
    }

    // 1. Add CURRENT SCORE to GLOBAL SCORE
        scores[activePlayer] += roundScore;

    // 2. Update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // 3. Check if player won the game
        if (scores[activePlayer] >= document.querySelector('input[type="number"]').value) {

            // Display winner
            getID('name-' + activePlayer).textContent = 'Winner!!!';

            // Remove active player class
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            // Add winner player class
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

            for (i = 0; i < diceDOM.length; i++) {
                // Hide dice img
                diceDOM[i].style.display = 'none';
            }

            // Change state variable
            gamePlaying = false;
            
        } else {

            // Change player
            nextPlayer();

        }

});
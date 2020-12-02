new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function () {
            const damage = this.calcDamage(3, 10);
            this.monsterHealth -= damage;
            if (this.checkWin()) return;
            this.turns.unshift({
                isPlayer: true,
                txt: 'Player hits Monster for ' + damage
            });

            this.monsterAttacks();
        },
        specialAttack: function () {
            const damage = this.calcDamage(10, 20);
            this.monsterHealth -= damage;
            if (this.checkWin()) return;
            this.turns.unshift({
                isPlayer: true,
                txt: 'Player hits Monster hard for ' + damage
            });

            this.monsterAttacks();
        },
        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                txt: 'Player heals for 10'
            });

            this.monsterAttacks();
        },
        giveUp: function () {
            this.gameIsRunning = false;
        },
        monsterAttacks: function () {
            const damage = this.calcDamage(5, 12)
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                txt: 'Monster hits player for ' + damage
            });
        },
        calcDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
})
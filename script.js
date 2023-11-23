// these values are set at the beginning
// and then used throughout the game
// global variable / an object
let gameState = {
    players: 2,
    whoseTurn: 1,
    gameOver: false
}

// function that considers which player's turn it is and then
// changes the UI accordingly
function changePlayer() {
    //checking if the current player is player 1 at the end of a move
    //attacking player 2
    if (gameState.whoseTurn === 1) {
        let playerTwoHealth = document.getElementById("playerTwoHealth");
        // conversts the innerHTML from string to a number and stores it in a variable
        let playerTwoHealthNum = Number(playerTwoHealth.innerHTML);
        // reduces by random number and then value is rounded up 
        playerTwoHealthNum -= Math.ceil(Math.random() * (50-1) + 1);
        // resets the HTML to the new value
        playerTwoHealth.innerHTML = playerTwoHealthNum;

        // checks if the player has reached 0 health
        if (playerTwoHealthNum <= 0) {
            // ensures health does not dig into the negative
            playerTwoHealthNum = 0;
            // ends the game
            gameOver();
        }
        // else if health value is greater than 0
        else {
            // switch to the next player and change the UI's display / behavior
            gameState.whoseTurn = 2;

            // grabs the 'playerName' element and changes the player's turn display
            let playerName = document.getElementById("playerName");
            playerName.innerHTML = `Player ${gameState.whoseTurn}`;
        }
        // now i will create an else statement for player2
        //player 2 is attacking player 1
    } else if(gameState.whoseTurn === 2){
        // creating a variable to store health level in/select player1 html element
        let playerOneHealth = document.getElementById("playerOneHealth")
        // have to convert innerHTML from string to num and storing value in a variable
        let playerOneHealthNum = Number(playerOneHealth.innerHTML)
        //reducing health by random number w math.random and also rounded up 
        playerOneHealthNum -= Math.ceil(Math.random() * (50-1) + 1);
        // save the new value to the HTML
        playerOneHealth.innerHTML = playerOneHealthNum;
        //time to check if health reaches 0 
        if (playerOneHealthNum <= 0) {
            //so if health less than 0, new variable will set health level @ 0 so it doesnt go into negative
            playerOneHealthNum = 0;
            //when health at 0, game is over
            gameOver();
        } else {
            //so if health is not at 0, game continues and switches player
            gameState.whoseTurn = 1;
            //update the playerName element to display current player
            let playerName = document.getElementById("playerName");
            playerName.innerHTML = `Player ${gameState.whoseTurn}`;
        }
    }
}


// if a player's health reaches 0 at the end of a turn, the game ends
// and the winner is announced
function gameOver() {
    let title = document.getElementById("title");
    title.style = "display: none;";
    let playerTurnDisplay = document.getElementById("playerTurn");
    playerTurnDisplay.style = "display: none;";

    let winningPlayer = document.getElementById("winningPlayer");
    winningPlayer.innerHTML = `Player ${gameState.whoseTurn} wins!`

    let gameOverScreen = document.getElementById("gameOverScreen");
    gameOverScreen.style = "display: flex; flex-direction: column;";
}


// function that allows the player two attack button to reduce the player two's
// health
//player 1 is attacking player 2

function attackPlayerTwo() {
    // compartmentalized function that will switch the player 2 attack button to inactive
    // and player 1 attack button to active using DOM manipulation
    // this also DISABLES the button, meaning they are not interactable
    function changeButtonStatus() {
        // i had to change this so that the right button was activating
        let playerTwoAttackButton = document.getElementById("playerOneAttack");
        playerTwoAttackButton.disabled = true;
        playerTwoAttackButton.classList.add("inactive");
        playerTwoAttackButton.classList.remove("active");

        let playerOneAttackButton = document.getElementById("playerTwoAttack");
        playerOneAttackButton.disabled = false;
        playerOneAttackButton.classList.add("active");
        playerOneAttackButton.classList.remove("inactive");
    }

    // commpartmentalized function that changes the player 1's sprite using the array
    // containing multiple images
    function animatePlayer() {
        // an array containing the images using in player one's animation
        // the indices are later used to cycle / "animate" when the player attacks
        let playerOneFrames = [
            "./images/R_Idle.png",
            "./images/R_Attack.png"
        ];

        let playerSprite = document.getElementById("playerOneSprite");
        // function we will call in setTimeout, before the frames change back
        // the idle stance
        // in other words, we set to the attack sprite, wait 3 seconds,
        // then set it back to the idle sprite
        playerSprite.src = playerOneFrames[1];
        
        // removes the 'idle' class from the player sprite
        playerSprite.classList.remove("idle");
        // adds the 'attack' class to the player sprite
        // ** CHECK THE CSS TO NOTE THE CHANGES MADE **
        playerSprite.classList.add("attack");

        // grabs the enemy sprite
        let enemySprite = document.getElementById("playerTwoSprite");
        let enemyDamage = document.getElementById("SFX_PlayerDamage");
        // removes the 'idle' class from the enemy sprite
        enemySprite.classList.remove("idle");
        // adds the 'attack' class to the enemy sprite
        // ** CHECK THE CSS TO NOTE THE CHANGES MADE **
        enemySprite.classList.add("damage");
        // sound that plays when enemy takes damage
        enemyDamage.play();

        // the function we will call in the setTimeOut method below
        // after 350 milliseconds
        // this function will execute this block of code
        function changePlayerOneSprite() {
            enemySprite.classList.remove("damage");
            enemySprite.classList.add("idle");

            playerSprite.src = playerOneFrames[0];
            playerSprite.classList.remove("attack");
            playerSprite.classList.add("idle");
        }
        setTimeout(changePlayerOneSprite, 350);
    }

    // for easy reading,
    // we do not include ALL of the above code within this condition
    // instead, we create higher-order functions to keep the code neat and readable
    if (gameState.whoseTurn === 1) {
        animatePlayer();
        changeButtonStatus();
        changePlayer();
    }
}

//now i will create a similar function where player 2 will be attacking player 1

function attackPlayerOne() {
    //similar to attackPlayerTwo function will be created to changeButtonStatus
    //this will also disable playerOne's attack button 

    function changeButtonStatus() {
        //accessing the html element element and saving to variable
        //using variable to ensure that buttons are disabled/active
        let playerOneAttackButton = document.getElementById("playerTwoAttack");
        playerOneAttackButton.disabled = true;
        playerOneAttackButton.classList.add("inactive");
        playerOneAttackButton.classList.remove("active");


        let playerTwoAttackButton = document.getElementById("playerOneAttack");
        playerTwoAttackButton.disabled = false;
        playerTwoAttackButton.classList.add("active");
        playerTwoAttackButton.classList.remove("inactive");
    }

    function animatePlayer() {
        //similar to attackPlayerTwo function, an array must be created that holds images
        //index of array will be used for the animation when player1 is attacked
        let playerTwoFrames = 
        ["./images/L_Idle.png", 
        "./images/L_Attack.png"];

        //accessing playerTwoSprite element in HTML to be able to add animation
        let playerSprite = document.getElementById("playerTwoSprite");
        playerSprite.src = playerTwoFrames[1];
        //now that playerTwo is attacking, i want to make sure that the attacking image is working
        playerSprite.classList.remove("idle");
        playerSprite.classList.add("attack");

        //getting enemySprite
        let enemySprite = document.getElementById("playerOneSprite");
        let enemyDamage = document.getElementById("SFX_PlayerDamage");

        //this code will cause player One is receiving damage
        //removing idle
        enemySprite.classList.remove("idle");
        enemySprite.classList.add("damage");
        //enemy damage sound will play
        enemyDamage.play()

        //this method will happen after 350 milliseconds per setTimeOut
        function changePlayerTwoSprite() {
            enemySprite.classList.remove("damage");
            enemySprite.classList.add("idle");

            playerSprite.src = playerTwoFrames[0];
            playerSprite.classList.remove("attack");
            playerSprite.classList.add("idle");
        }

        setTimeout(changePlayerTwoSprite, 350)

    } if (gameState.whoseTurn === 2) {
        animatePlayer();
        changeButtonStatus();
        changePlayer()
    }

}


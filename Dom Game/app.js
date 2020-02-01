/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousValue;

function init() {
  gamePlaying = true;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  document.querySelector(".dice1").style.display = "none";
  document.querySelector(".dice2").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player1";
  document.getElementById("name-1").textContent = "Player2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    var dice1DOM = document.querySelector(".dice1");
    var dice2DOM = document.querySelector(".dice2");
    dice1DOM.style.display = "block";
    dice2DOM.style.display = "block";
    dice1DOM.src = "dice-" + dice1 + ".png";
    dice2DOM.src = "dice-" + dice2 + ".png";
    var dice = dice1+dice2;
    //#ONE dice game 
    // if (previousValue === 6 && dice === 6) {
    //     console.log('sorry');
    //   scores[activePlayer] = "0";
    //   document.querySelector("#score-" + activePlayer).textContent =
    //     scores[activePlayer];
    //     nextPlayer();
    //     previousValue =0;
    // } else if (dice !== 1) {
    //   previousValue = dice;
    //   roundScore += dice;
    //   document.querySelector(
    //     "#current-" + activePlayer
    //   ).textContent = roundScore;
    // } 
    //#TWO dice game
    if (dice1 !== 1 && dice2 !== 1) {
        roundScore += dice1 + dice2;
        document.querySelector(
            "#current-" + activePlayer
          ).textContent = roundScore;
    }
    else {
        roundScore = 0;
        document.querySelector(
            "#current-" + activePlayer
          ).textContent = roundScore;
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
     var bestOf = document.querySelector('.input-panel').value;
    if (scores[activePlayer] >= (bestOf === '' ? 10 : bestOf)) {
      document.getElementById("name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice1").style.display = "none";
      document.querySelector(".dice2").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".dice1").style.display = "none";
  document.querySelector(".dice2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

// document.querySelector('#current-' + activePlayer).textContent = dice;
// //document.querySelector('#current-' + activePlayer).innerHTML = '<em>'+ dice +'</em>';
// var x = document.querySelector('#score-0').textContent;

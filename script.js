'use strict';
const scoreOne = document.getElementById('score--0');
const scoreTwo = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
diceEl.classList.add('hidden');

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let score, currentScore, activePlayer, playing;

const init = function () {
  playing = true;
  score = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  scoreOne.textContent = 0;
  scoreTwo.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  // generate a random number between 1 -6
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    //display the result on the DICE
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    // add the result of dice to current score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
// when you press hold
btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to the total score for the active player
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // the total score of the player is >= 100?player wins : switch to next player.
    if (score[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  // reset all the values
  init();
});

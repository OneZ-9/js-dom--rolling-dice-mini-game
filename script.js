'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');

const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let playing, activePlayer, scores, currentScore;

function init() {
  playing = true;
  activePlayer = 0;
  scores = [0, 0];
  currentScore = 0;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
}

init();

const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

const finishGame = () => {
  playing = false;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  diceEl.classList.add('hidden');
};

const handleDiceRoll = () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      scores[activePlayer] += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];
      if (scores[activePlayer] >= 100) {
        finishGame();
      } else {
        switchPlayer();
      }
    }
  }
};

const handleHoldScore = () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      finishGame();
    } else {
      switchPlayer();
    }
  }
};

btnRoll.addEventListener('click', handleDiceRoll);
btnHold.addEventListener('click', handleHoldScore);
btnNew.addEventListener('click', init);

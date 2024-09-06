'use strict';

let current = 0;
let score1 = 0;
let score2 = 0;

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

const current1 = document.querySelector('#current--0');
const current2 = document.querySelector('#current--1');
const scorePl1 = document.querySelector('#score--0');
const scorePl2 = document.querySelector('#score--1');

const diceImg = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const handleHold = () => {
  if (player1.classList.contains('player--active')) {
    score1 = score1 += current;
    current = 0;
    scorePl1.textContent = score1;
    current1.textContent = current;
    if (score1 >= 100) {
      player1.classList.add('player--winner');
    } else {
      player1.classList.remove('player--active');
      player2.classList.add('player--active');
    }
  } else {
    score2 = score2 += current;
    current = 0;
    scorePl2.textContent = score2;
    current2.textContent = current;
    if (score2 >= 100) {
      player2.classList.add('player--winner');
    } else {
      player2.classList.remove('player--active');
      player1.classList.add('player--active');
    }
  }
};

const handleRoll = () => {
  let dice = Math.trunc(Math.random() * 6) + 1;
  diceImg.classList.remove('hidden');
  diceImg.src = `dice-${dice}.png`;

  if (dice > 1) {
    if (player1.classList.contains('player--active')) {
      current1.textContent = current += dice;
    } else {
      current2.textContent = current += dice;
    }
  } else {
    handleHold();
  }
};

btnRoll.addEventListener('click', handleRoll);

btnHold.addEventListener('click', handleHold);

btnNew.addEventListener('click', () => {
  location.reload();
});

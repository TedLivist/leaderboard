import './assets/stylesheets/style.css';
import buildList from './modules/buildList.js';
import createGame from './modules/createGame.js';
import getScores from './modules/getScores.js';
import submitScores from './modules/submitScores.js';

const submitBtn = document.querySelector('.submit-btn');
const refreshBtn = document.querySelector('.refresh-btn');
const nameInput = document.querySelector('.player-name');
const scoreInput = document.querySelector('.player-score');

const container = document.querySelector('.scores-list');
container.style.display = 'none';

window.addEventListener('load', async () => {
  let { result } = await createGame();
  result = result.substring(14, 34);

  submitBtn.addEventListener('click', async () => {
    await submitScores(nameInput.value, scoreInput.value, `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${result}/scores`);
    nameInput.value = '';
    scoreInput.value = '';
  });

  refreshBtn.addEventListener('click', async () => {
    const getted = await getScores(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${result}/scores`);
    await buildList(container, getted.result);
  });
});
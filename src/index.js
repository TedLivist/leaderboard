import './assets/stylesheets/style.css';

const submitBtn = document.querySelector('.submit-btn')
const refreshBtn = document.querySelector('.refresh-btn')
const nameInput = document.querySelector('.player-name')
const scoreInput = document.querySelector('.player-score')

const container = document.querySelector('.scores-list')
container.style.display = 'none'

const createGame = async () => {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games', {
    method: 'POST',
    body: JSON.stringify({name: 'my game'}),
    headers: {
      'Content-type': 'application/json; Charset=UTF-8',
    },
  })
  return response.json()
}

const getScores = async (url) => {
  const response = await fetch(url)
  return response.json()
}

const submitScores = async (name, score, url) => {
  const response = await fetch(url, {//`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${result}/scores`, {
    method: 'POST',
    body: JSON.stringify({
      user: name,
      score: score
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  return response.json()
}

const buildList = async (containerElement, list) => {
  containerElement.style.display = 'block'
  containerElement.innerHTML = ''

  for (let item of list) {
    const scoreContainer = document.createElement('div')
    scoreContainer.innerHTML = `${item.user}: ${item.score}`
    containerElement.appendChild(scoreContainer)
  }
}

window.addEventListener('load', async () => {
  let { result } = await createGame()
  result = result.substring(14, 34)

  submitBtn.addEventListener('click', async () => {
    const subbed = await submitScores(nameInput.value, scoreInput.value, `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${result}/scores`)
    console.log(subbed)
  })

  refreshBtn.addEventListener('click', async () => {
    const getted = await getScores(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${result}/scores`)
    await buildList(container, getted.result)
  })
})
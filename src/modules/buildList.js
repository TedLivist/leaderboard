const buildList = async (containerElement, list) => {
  containerElement.style.display = 'block'
  containerElement.innerHTML = ''

  for (let item of list) {
    const scoreContainer = document.createElement('div')
    scoreContainer.innerHTML = `${item.user}: ${item.score}`
    containerElement.appendChild(scoreContainer)
  }
}

export default buildList
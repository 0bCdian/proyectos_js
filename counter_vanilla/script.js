const createCounter = document.getElementById('createCounter')
const container = document.getElementById('container')
let counterInstance = 0
let value = {}

function createNewCounter() {
  const counter = document.createElement('p')
  const decrease = document.createElement('button')
  const increase = document.createElement('button')
  const reset = document.createElement('button')
  const counterId = 'value' + counterInstance
  value[counterId] = 0
  counter.innerHTML = value[counterId]
  decrease.innerText = 'decrease'
  increase.innerText = 'increase'
  reset.innerText = 'reset'
  counter.setAttribute('id', counterId)
  decrease.setAttribute('class', 'decrease')
  increase.setAttribute('class', 'increase')
  reset.setAttribute('class', 'reset')
  decrease.addEventListener('click', () => {
    const counter = document.getElementById(counterId)
    value[counterId]--
    counter.innerHTML = value[counterId]
  })
  increase.addEventListener('click', () => {
    const counter = document.getElementById(counterId)
    value[counterId]++
    counter.innerHTML = value[counterId]
  })
  reset.addEventListener('click', () => {
    const counter = document.getElementById(counterId)
    value[counterId] = 0
    counter.innerHTML = value[counterId]
  })
  container.append(counter, decrease, reset, increase)
  counterInstance++
}

createCounter.addEventListener('click', createNewCounter)

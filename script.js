const decrease = document.getElementById('decrease')
const reset = document.getElementById('reset')
const increase = document.getElementById('increase')
const counter = document.getElementById('counter')
let counterValue = 0

decrease.addEventListener('click', () => {
  counterValue--
  counter.innerHTML = counterValue
})

increase.addEventListener('click', () => {
  counterValue++
  counter.innerHTML = counterValue
})

reset.addEventListener('click', () => {
  counterValue = 0
  counter.innerHTML = counterValue
})

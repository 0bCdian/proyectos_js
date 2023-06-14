// Globals
let gameState = {
  gameBoard: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  currentPlayer: 'x',
  scoreBoard: { x: 0, y: 0 },
}

// helpers
function checkWinner(currentPlayer) {
  let diagonalMatch = 0
  let verticalMatch = 0
  let horizontalMatch = 0
  let reverseDiagonalMatch = 0
  let reverseDiagonal = [
    gameState.gameBoard[0][2],
    gameState.gameBoard[1][1],
    gameState.gameBoard[2][0],
  ]
  for (let row = 0; row < 3; row++) {
    if (gameState.gameBoard[row][row] === currentPlayer) {
      diagonalMatch++
    }
    if (reverseDiagonal[row] === currentPlayer) {
      reverseDiagonalMatch++
    }
    for (let column = 0; column < 3; column++) {
      if (gameState.gameBoard[row][column] === currentPlayer) {
        horizontalMatch++
      }
      if (gameState.gameBoard[column][row] === currentPlayer) {
        verticalMatch++
      }
    }
    if (verticalMatch === 3 || horizontalMatch === 3) {
      return true
    } else {
      verticalMatch = 0
      horizontalMatch = 0
    }
  }
  if (diagonalMatch === 3) {
    return true
  }
  if (reverseDiagonalMatch === 3) {
    return true
  }
  return false
}

function handleWinner(winner) {
  document.querySelector('h1').innerHTML = `Ganador es ${winner}`
  setTimeout(5000, () => {
    document.querySelector('h1').innerHTML = ''
  })
  gameState.gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]
  gameState.scoreBoard.winner++
  document.getElementById(winner).innerHTML = ' ' + gameState.scoreBoard[winner]
}

function initGame() {
  const $divsArray = document.querySelectorAll('div')
  $divsArray.forEach(($div) => {
    $div.addEventListener('click', function clickHandler() {
      const [xCordinate, yCoordinate] = $div.getAttribute('cell').split(',')
      gameState.gameBoard[xCordinate][yCoordinate] = gameState.currentPlayer
      $div.innerHTML = gameState.currentPlayer
      $div.removeEventListener('click', clickHandler)
      if (checkWinner(gameState.currentPlayer)) {
        handleWinner(gameState.currentPlayer)
      }
      gameState.currentPlayer = gameState.currentPlayer === 'x' ? 'o' : 'x'
    })
  })
}

initGame()

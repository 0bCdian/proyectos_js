// Globals
const gameState = {
  gameBoard: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  currentPlayer: 'x',
  scoreBoard: { x: 0, o: 0 },
}

// helpers

/**
 *[checkWinner description]
 * receives current player string parameter, and iterates over the gameState.gameboard matrix checking if the current player repeats three times in a winning pattern (vertical, horizontal or both diagonals), returns true if any winning match is found, false otherwise
 * @param {string} currentPlayer
 * @returns {boolean}
 */
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

/**
 * [handleWinner description]
 *
 * @param {string} winner
 * changes the h1 to display the current winner, resets the board updates the gameState.gameBoard scores and restarts the game
 */
function handleWinner(winner) {
  const winnerPrompt = document.querySelector('h1')
  winnerPrompt.innerHTML = `Ganador: ${winner}`
  winnerPrompt.removeAttribute('class')
  resetBoard()
  setTimeout(() => {
    winnerPrompt.className = 'hidden'
    gameState.scoreBoard[winner]++
    gameState.currentPlayer = winner
    initGame()
  }, 2000)
}

/**
 * [setScores description]
 *
 * retrieves spans with scores and updates their value to the gameState.scoreBoard corresponding values
 *
 * @return {void}
 */
function setScores() {
  const scoreX = document.getElementById('x')
  const scoreY = document.getElementById('y')
  scoreX.innerHTML = gameState.scoreBoard.x
  scoreY.innerHTML = gameState.scoreBoard.o
}

/**
 * [resetBoard description]
 *
 * Cleans the gameState.gameBoard matrix with empty strings, removes all remaining event listeners from the div cells,and sets them to empty strings
 */
function resetBoard() {
  gameState.gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]
  const $divsArray = document.querySelectorAll('div')
  $divsArray.forEach(($div) => {
    $div.removeEventListener('click', clickHandler)
    $div.innerHTML = ''
  })
}

/**
 *
 * @param {divElement} target
 *
 * [clickHandler description]
 *
 * retrieves the cell attribute from the div passed as argument and updates the gameState.gameboard corresponding cell with the gameState.currentPlayer value, also changes the div innerHTML with the gameSate.currentPlayer value, removes this event handler from the div, and checks if the current player won, else changes the currentPlayer to the next
 *
 */
function clickHandler({ target }) {
  const [xCordinate, yCoordinate] = target.getAttribute('cell').split(',')
  gameState.gameBoard[xCordinate][yCoordinate] = gameState.currentPlayer
  target.innerHTML = gameState.currentPlayer
  target.removeEventListener('click', clickHandler)
  if (checkWinner(gameState.currentPlayer)) {
    handleWinner(gameState.currentPlayer)
  } else {
    gameState.currentPlayer = gameState.currentPlayer === 'x' ? 'o' : 'x'
  }
}

/**
 * [initGame description]
 *
 * initializes the game, setting the scores, and an event listener to all the div cells.
 */
function initGame() {
  setScores()
  const $divsArray = document.querySelectorAll('div')
  $divsArray.forEach(($div) => {
    $div.addEventListener('click', clickHandler)
  })
}

initGame()

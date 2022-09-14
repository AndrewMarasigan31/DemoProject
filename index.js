const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('.cell')
const board = document.getElementById('board')
const restartButton = document.getElementById('restartButton')
const text = document.getElementById('text');
const turn = document.getElementById('turn');
const historyControls = document.getElementById('history');
const previousMove = document.getElementById('previousMove');
const nextMove = document.getElementById('nextMove');
let circleTurn
let history = [];
let X_SCORE = 0;
let CIRCLE_SCORE = 0;
let DRAWS = 0;
const xScoreDiv = document.getElementById('xScore');
const oScoreDiv = document.getElementById('oScore');
const drawsDiv = document.getElementById('draws');
let state = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  text.innerHTML = 'Tic Tac Toe';
  historyControls.classList.remove('show');
  history = [];

  state = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  xScoreDiv.innerHTML = `X Wins: ${X_SCORE}`;
  oScoreDiv.innerHTML = `O Wins: ${CIRCLE_SCORE}`;
  drawsDiv.innerHTML = `Draws: ${DRAWS}`;
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    text.innerHTML = 'Draw!';
    DRAWS += 1;
  } else {
    text.innerHTML = `${circleTurn ? 'O' : 'X'} Wins!`;
    if (circleTurn) {
      CIRCLE_SCORE += 1;
    } else {
      X_SCORE += 1;
    }
  }

  xScoreDiv.innerHTML = `X Wins: ${X_SCORE}`;
  oScoreDiv.innerHTML = `O Wins: ${CIRCLE_SCORE}`;
  drawsDiv.innerHTML = `Draws: ${DRAWS}`;

  turn.innerHTML = 'Game Over';
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  cellElements.forEach((cell) => {
    cell.removeEventListener('click', handleClick);
  });


  historyControls.classList.add('show');
  console.log(history);

  let counter = history.length - 1;
  console.log(counter);
  let max = history.length - 1;
  let min = 0;
  console.log(min, max);

  previousMove.addEventListener('click', function () {
    if (counter === min) {
      console.log('no more previous move');
    } else {
      counter -= 1;
    }

    let display = history[counter];
    console.log(display);

    updateBoard(display);
  });

  nextMove.addEventListener('click', function () {
    if (counter === max) {
      console.log('no more next move');
    } else {
      counter += 1;
    }

    let display = history[counter];
    console.log(display);

    updateBoard(display);
  });
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  // accesses row and column of current cell
  let row = cell.getAttribute('data-cell-row');
  let column = cell.getAttribute('data-cell-column');
  // adds the move to the state array
  state[row][column] = currentClass;
  // creates a copy of current state
  let tempstate = JSON.parse(JSON.stringify(state));
  // pushes copy to history
  history.push(tempstate);
  console.log(history);
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
    turn.innerHTML = `O is playing`;
  } else {
    board.classList.add(X_CLASS);
    turn.innerHTML = `X is playing`;
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

function updateBoard(historyIndex) {
  let cellElementCounter = 0;
  for (let i = 0; i < historyIndex.length; i++) {
    for (let j = 0; j < historyIndex[i].length; j++) {
      cellElements[cellElementCounter].classList.remove(X_CLASS);
      cellElements[cellElementCounter].classList.remove(CIRCLE_CLASS);
      if (historyIndex[i][j] != '') {
        cellElements[cellElementCounter].classList.add(historyIndex[i][j]);
      }
      cellElementCounter += 1;
    }
  }
}
function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

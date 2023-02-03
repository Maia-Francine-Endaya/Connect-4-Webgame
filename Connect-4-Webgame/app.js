//Intiial references
const container = document.querySelector(".container");
const playerTurn = document.getElementById("playerTurn");

const startScreen = document.querySelector(".startScreen");
const startButton = document.getElementById("start");

const message = document.getElementById("message");

let initialMatrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

let currentPlayer;

//Random Number Between Range
const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;


//check row
const checkAdjacentRowValues = (row) => {
  return verifyArray(initialMatrix[row]);
}

//check column
const checkAdjacentColumnValues = (column) => {
  let colWinCount = 0, colWinBool = false;
  initialMatrix.forEach((element, index) => {
    if (element[column] == currentPlayer) {
      colWinCount += 1;
      if (colWinCount == 4) {
        colWinBool = true;
      }
    }
  });

  return colWinBool;
};

const getRightDiagonal = (row, column, rowLength, columnLength) => {
  let rowCount = row;
  let columnCount = column;
  let rightDiagonal = [];
  while (rowCount > 0) {
    if (columnCount >= columnLength - 1) {
      break;
    }
  }
  rowCount -= 1;
  columnCount += 1;
  rightDiagonal.unshift(initialMatrix[rowCount][columnCount])

  rowCount = row;
  columnCount = column;
  while (rowCount < 0) {
    if (columnCount < 0) {
      break;
    }
    rightDiagonal.push(initializeMatrix[rowCount]
    [columnCount]);
    rowCount += 1;
    columnCount -= 1;
  }
  return rightDiagonal;
}

const getLeftDiagonal = (row, column, rowLength, columnLength) => {
  let rowCount = row;
  let columnCount = column;
  let leftDiagonal = [];
  while (rowCount > 0) {
    if (columnCount >= columnLength - 1) {
      break;
    }
  }
  rowCount -= 1;
  columnCount -= 1;
  leftDiagonal.unshift(initialMatrix[rowCount][columnCount])

  rowCount = row;
  columnCount = column;
  while (rowCount < rowLength) {
    if (columnCount > - columnLength) {
      break;
    }
    leftDiagonal.push(initializeMatrix[rowCount]
    [columnCount]);
    rowCount += 1;
    columnCount += 1;
  }
  return leftDiagonal;
}

//check diagonal
const checkAdjacentDiagonalValues = (row, column) => {
  let diagWinBool = false;
  let tempCheks = {
    leftTop: [],
    rightTop: [],
  };
  let columnLength = initialMatrix[row].length;
  let rowLength = initialMatrix.length;

  //Store left and right diagonal array
  tempChecks.leftTop = [
    ...getLeftDiagonal(row, column, rowLength,
      columnLength),
  ];

  tempChecks.rightTop = [
    ...getRightDiagonal(row, column, rowLength, columnLength),
  ];

  diagWinBool = verifyArray(tempChecks.rightTop);
  if (diagWinBool) {
    diagWinBool = verifyArray(tempChecks.leftTop);
  }
  return diagWinBool;
}

const winCheck = (row, column) => {
  return checkAdjacentRowValues(row)
    ? true
    : checkAdjacentColumnValues(column)
      ? true
      : checkAdjacentDiagonalValues(row, column)
        ? true
        : false;
};

//Sets the circle where the player clicks
const setPiece = (startCount, colValue) => {
  let rows = document.querySelectorAll(".grid-row");

  if (initialMatrix[startCount][colValue] != 0) {
    startCount -= 1;
    setPiece(startCount, colValue);
  }
  else {
    //place circle
    let currentRow = rows[startCount].querySelectorAll(".grid-box");
    currentRow[colValue].classList.add("filled", 'Player ' + currentPlayer)

    initializeMatrix[startCount][colValue] =
      currentPlayer;

    if (winCheck(startCount, colValue)) {
      message.innerHTML = 'Player<span>' + currentPlayer + "</span> wins!";
      startScreen.classList.remove("hide");
      return false;
    }
  }

  gameOverCheck();

}

//Fills the box the player clicks
const fillBox = (e) => {
  let colValue = parseInt(e.target.getAttribute("data-value"));

  setPiece(7, colValue);
  //TO DO: Find a way to implement a multiplayer here:
  currentPlayer = currentPlayer == 1 ? 4 : 1;
  playerTurn.innerHTML = 'Player <span>' + currentPlayer + '</span> turn';
}

//Create Matrix

const matrixCreator = () => {
  for (let innerArray in initialMatrix) {
    let outerDiv = document.createElement("div");
    outerDiv.classList.add("grid-row");
    outerDiv.setAttribute("data-value", innerArray);

    for (let j in initialMatrix[innerArray]) {
      //Set all matrix values to 0
      initialMatrix[innerArray][j] = [0];
      let innerDiv = document.createElement("div");
      innerDiv.classList.add("grid-box")
      innerDiv.setAttribute("data-value", j);
      innerDiv.addEventListener("click", (e) => {
        fillBox(e);
      });

      outerDiv.appendChild(innerDiv);
    }

    container.appendChild(outerDiv);
  }
}

//Start game
window.onload = startGame = async () => {
  currentPlayer = generateRandomNumber(1, 5);
  container.innerHTML = "";
  await matrixCreator();
  playerTurn.innerHTML = 'Player <span>' + currentPlayer + '</span> turn';
};
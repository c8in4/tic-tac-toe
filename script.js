const gameboard = () => {
  const rows = 3;
  const columns = 3;
  const grid = [];

  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < columns; j++) {
      grid[i][j] = '';
    };
  };

  const getGrid = () => grid;

  const placeToken = (row, column, token) => {
    if (grid[row][column]) {
      return false
    }
    grid[row][column] = token;
    return true;
  };

  const checkForWin = () => {
    if (
      (
        // check rows
        grid[0][0] &&
        grid[0][0] === grid[0][1] &&
        grid[0][0] === grid[0][2]
      ) ||
      (
        grid[1][0] &&
        grid[1][0] === grid[1][1] &&
        grid[1][0] === grid[1][2]
      ) ||
      (
        grid[2][0] &&
        grid[2][0] === grid[2][1] &&
        grid[2][0] === grid[2][2]
      ) ||
      (
        // check columns
        grid[0][0] &&
        grid[0][0] === grid[1][0] &&
        grid[0][0] === grid[2][0]
      ) ||
      (
        grid[0][1] &&
        grid[0][1] === grid[1][1] &&
        grid[0][1] === grid[2][1]
      ) ||
      (
        grid[0][2] &&
        grid[0][2] === grid[1][2] &&
        grid[0][2] === grid[2][2]
      ) ||
      (
        // check for diagonals
        grid[0][0] &&
        grid[0][0] === grid[1][1] &&
        grid[0][0] === grid[2][2]
      ) ||
      (
        grid[0][2] &&
        grid[0][2] === grid[1][1] &&
        grid[0][2] === grid[2][0]
      )
    ) {
      return true
    } else return false
  };

  return { getGrid, placeToken, checkForWin }

};

const getplayers = () => {
  const playerOneName = prompt("Enter a name for Player 1:");
  const playerTwoName = prompt("Enter a name for Player 2:");

  return [
    {
      name: playerOneName,
      token: "X"
    },
    {
      name: playerTwoName,
      token: "O"
    }
  ]
};

const gameController = (() => {
  const players = getplayers();
  let board = gameboard();

  let activePlayer = players[0];

  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const playRound = (row, column) => {
    if (board.placeToken(row, column, activePlayer.token) && !board.checkForWin()) {
      switchPlayer();
    };
    // board.getGrid();
    console.log(board.getGrid());

    if (board.checkForWin()) {
      console.log(`${activePlayer.name} won`);
      switchPlayer();
    };
  };

  const resetGame = () => {
    board = gameboard();
  };

  return { playRound, resetGame }

})();

const displayController = (() => {

})();

const game = gameController;

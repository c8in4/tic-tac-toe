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

  const checkForWin = (token) => {
    if (
      // check rows
      (
        grid[0][0] == token &&
        grid[0][1] == token &&
        grid[0][2] == token
      ) ||
      (
        grid[1][0] == token &&
        grid[1][1] == token &&
        grid[1][2] == token
      ) ||
      (
        grid[2][0] == token &&
        grid[2][1] == token &&
        grid[2][2] == token
      ) ||
      (
        // check columns
        grid[0][0] == token &&
        grid[1][0] == token &&
        grid[2][0] == token
      ) ||
      (
        grid[0][1] == token &&
        grid[1][1] == token &&
        grid[2][1] == token
      ) ||
      (
        grid[0][2] == token &&
        grid[1][2] == token &&
        grid[2][2] == token
      ) ||
      (
        // check for diagonals
        grid[0][0] == token &&
        grid[1][1] == token &&
        grid[2][2] == token
      ) ||
      (
        grid[0][2] == token &&
        grid[1][1] == token &&
        grid[2][0] == token
      )
    ) {
      return true
    } else return false
  };

  return { getGrid, placeToken, checkForWin }

};

// hard coded names for now
const getplayers = () => {
  const playerOneName = 'x';
  // prompt("Enter a name for Player 1:");
  const playerTwoName = 'o';
  // prompt("Enter a name for Player 2:");

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
  let gameRunning = false;
  // let winner;

  const startGame = () => {
    gameRunning = true;
    console.log(`${activePlayer.name}'s turn`);
  };

  
  const playRound = (row, column) => {
    if (gameRunning) {
      if (board.placeToken(row, column, activePlayer.token)) {
        if (board.checkForWin(activePlayer.token)) {
          console.log(`${activePlayer.name} won`);
          gameRunning = false;
        };
        switchPlayer();
      };
      // temporarily logging to console
      console.log(board.getGrid());
      console.log(`${activePlayer.name}'s turn`);
    }
    
  };
  
  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const resetGame = () => {
    board = gameboard();
  };

  return { startGame, playRound, resetGame }

})();

const displayController = (() => {

})();

const game = gameController;

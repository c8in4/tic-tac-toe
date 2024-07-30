const gameBoard = () => {
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

  return { getGrid, placeToken }

};
const gameController = (() => {

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

  const players = getplayers();
  let board;
  let activePlayer = players[0];
  let gameRunning = false;
  let winner;

  const startGame = () => {
    board = gameBoard();
    gameRunning = true;
    winner = '';
    console.log(board.getGrid());
    console.log(`${activePlayer.name}'s turn`);
  };

  const playRound = (row, column) => {
    if (gameRunning) {

      if (board.placeToken(row, column, activePlayer.token)) {
        if (checkForWin(activePlayer.token)) {
          winner = activePlayer;
          console.log(`${winner.name} won`);
          gameRunning = false;
        };
        if (checkForTie()) {
          console.log(`That's a tie.`);
          gameRunning = false;
        };
        switchPlayer();
      };

      if (gameRunning) console.log(`${activePlayer.name}'s turn`);
      console.log(board.getGrid());

    };
  };

  const checkForWin = (token) => {
    const grid = board.getGrid();
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
    };
    return false
  };

  const checkForTie = () => {
    const grid = board.getGrid();
    if (
      !checkForWin() &&
      grid[0][0] &&
      grid[0][1] &&
      grid[0][2] &&
      grid[1][0] &&
      grid[1][1] &&
      grid[1][2] &&
      grid[2][0] &&
      grid[2][1] &&
      grid[2][2]
    ) return true;
    return false;
  };

  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  return { startGame, playRound, getplayers, getActivePlayer }

})();

const screenController = (() => {
  const game = gameController;


  // need: activePlayer, board, winner

  return { game }

})();

game = screenController;
const gameBoard = () => {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i][j] = '';
    };
  };

  const getBoard = () => board;

  const placeToken = (row, column, token) => {
    if (board[row][column]) {
      return false
    }
    board[row][column] = token;
    return true;
  };

  return { getBoard, placeToken }

};
const gameController = (() => {

  const getplayers = () => {
    const playerOneInput = document.querySelector('#playerOne');
    const playerTwoInput = document.querySelector('#playerTwo');

    const playerOneName = playerOneInput.value ? playerOneInput.value : 'Player 1';
    const playerTwoName = playerTwoInput.value ? playerTwoInput.value : 'Player 2';

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

  let board;
  let players;
  let activePlayer;
  let winner;
  let gameRunning = false;

  const startGame = () => {
    board = gameBoard();
    players = getplayers();
    activePlayer = players[0];
    if (winner && winner.name == activePlayer.name) switchPlayer();
    winner = '';
    gameRunning = true;
    console.log(`${activePlayer.name}'s turn`);
    console.log(board.getBoard());
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
      console.log(board.getBoard());

    };
  };

  const checkForWin = (token) => {
    const grid = board.getBoard();
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
    const grid = board.getBoard();
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

  const getBoard = () => board.getBoard();
  const getActivePlayer = () => activePlayer;
  const getWinner = () => winner;

  return { startGame, playRound, getBoard, getplayers, getActivePlayer, getWinner }

})();

const screenController = (() => {
  const game = gameController;  // need: activePlayer, board, winner
  const startButton = document.querySelector('#startButton');
  const gameBoardDiv = document.querySelector('#grid');
  const infoDiv = document.querySelector('#info');

  const updateScreen = () => {
    gameBoardDiv.textContent = '';

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();
    const winner = game.getWinner();
  
    let infoText = `${activePlayer.name}'s turn`;
    if (winner) {
      infoText = `${winner.name} won.`;
    };
    infoDiv.textContent = infoText;

    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = columnIndex;
        cellButton.textContent = cell.valueOf();
        gameBoardDiv.appendChild(cellButton);
      });
    });
  };

  const clickEventHandler = (e) => {
    const selectedRow = e.target.dataset.row;
    const selectedColumn = e.target.dataset.column;

    if (!selectedRow && !selectedColumn) return;

    game.playRound(selectedRow, selectedColumn);
    updateScreen();
  };
  gameBoardDiv.addEventListener('click', clickEventHandler);
  startButton.addEventListener('click', () => {
    game.startGame();
    updateScreen();
  });

  game.startGame();
  updateScreen();

})();

game = screenController;
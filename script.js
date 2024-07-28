const gameBoard = (() => {
  const rows = 3;
  const columns = 3;
  let grid = [];

  // creates grid of rows x columns
  for (i = 0; i < rows; i++) {
    grid[i] = [];
    for (j = 0; j < columns; j++) {
      grid[i].push('');
    };
  };

  // const getBoard = () => grid;
  const getBoard = () => console.log(grid); // temporarily printing instead of returning


  const placeMarker = (row, column, marker) => {
    grid[row][column] = marker;
    // if (grid[row][column] === '') { grid[row][column] = marker };
  };

  return { placeMarker, getBoard };

})();


const gameController = (() => {
  const createPlayer = (number) => {
    return prompt(`Player ${number}'s name:`);
  };
  
  const playerOneName = createPlayer(1);
  const playerTwoName = createPlayer(2);

  const board = gameBoard;

  const players = [
    {
      name: playerOneName,
      token: 'X'
    },
    {
      name: playerTwoName,
      token: 'O'
    }
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.getBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    // console.log(`${getActivePlayer().name} finished`);
    board.placeMarker(row, column, getActivePlayer().token);
    switchPlayerTurn();
    printNewRound();
  };
  
  printNewRound();

  return { playRound, getActivePlayer };

})();

const game = gameController;
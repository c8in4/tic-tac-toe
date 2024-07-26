const gameBoard = (() => {
  const rows = 3;
  const columns = 3;
  let board = [];

  for (i = 0; i < rows; i++) {
    board[i] = [];
    for (j = 0; j < columns; j++) {
      board[i].push('-');
    };
  };

  const getBoard = () => board;

  const printBoard = () => {
    const boardCells = board.map((row) => row.map((cell) => cell));
    console.log(boardCells);
  };

return { getBoard, printBoard };

})();


gameBoard.getBoard();


const game = {};

const createPlayer = (name) => {

  return {};
};


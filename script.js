// TODO:
// store gameboard as array inside of Gameboard object
// players in objects
// object to control the flow of the game

// factories whenever possible to keep code minimal
// gameboard and displayController should be IIFE

// 3 objects: game, player, gameboard

const gameboard = (function () {
	const gameboard = []
  	const gameboardRows = 3
  	const gameboardColumns = 3
  
  	for (let row = 0; row < gameboardRows; row++) {
    	gameboard[row] = []
    	for (let col = 0; col < gameboardColumns; col++) {
      	gameboard[row][col] = ''
    	}
  	}
  
  	const getGameBoard = () => gameboard
  	const printGameBoardToConsole = () => console.table(gameboard)
  
  	const placeToken = (row, col, token) => {
    	if (!gameboard[row][col]) {
			gameboard[row][col] = token
			return true
		} return false
  	}

  	return {getGameBoard, placeToken}

})();


const player = (function() {
	function createPlayer(name, token) {
		return { name, token }
	}

  	const player1 = createPlayer('Player 1', 'X')
  	const player2 = createPlayer('Player 2', 'O')
	const players = [player1, player2]
	const getPlayers = () => players

	return { getPlayers }
})();

const game = (function(){
  	let currentPlayerIndex = 0
	function switchPlayer() {
		currentPlayerIndex = currentPlayerIndex ? 0 : 1
	}
	const getCurrentPlayer = () => player.getPlayers()[currentPlayerIndex]

  	const playRound = (row, col) => {
		if (gameboard.placeToken(row, col, getCurrentPlayer().token)) {
			gameboard.getGameBoard()
			switchPlayer()
		}
	}
  	const checkForWin = () => {}
  	const checkForTie = () => {}


	return { getCurrentPlayer, playRound }
})();


////////////////////////////////
// connect four code:
/*
** The Gameboard represents the state of the board
** Each square holds a Cell (defined later)
** and we expose a dropToken method to be able to add Cells to squares
*/

// function Gameboard() {
//   const rows = 6;
//   const columns = 7;
//   const board = [];

//   // Create a 2d array that will represent the state of the game board
//   // For this 2d array, row 0 will represent the top row and
//   // column 0 will represent the left-most column.
//   // This nested-loop technique is a simple and common way to create a 2d array.
//   for (let i = 0; i < rows; i++) {
//     board[i] = [];
//     for (let j = 0; j < columns; j++) {
//       board[i].push(Cell());
//     }
//   }

//   // This will be the method of getting the entire board that our
//   // UI will eventually need to render it.
//   const getBoard = () => board;

//   // In order to drop a token, we need to find what the lowest point of the
//   // selected column is, *then* change that cell's value to the player number
//   const dropToken = (column, player) => {
//     // Our board's outermost array represents the row,
//     // so we need to loop through the rows, starting at row 0,
//     // find all the rows that don't have a token, then take the
//     // last one, which will represent the bottom-most empty cell
//     const availableCells = board.filter((row) => row[column].getValue() === 0).map(row => row[column]);

//     // If no cells make it through the filter, 
//     // the move is invalid. Stop execution.
//     if (!availableCells.length) return;

//     // Otherwise, I have a valid cell, the last one in the filtered array
//     const lowestRow = availableCells.length - 1;
//     board[lowestRow][column].addToken(player);
//   };

//   // This method will be used to print our board to the console.
//   // It is helpful to see what the board looks like after each turn as we play,
//   // but we won't need it after we build our UI
//   const printBoard = () => {
//     const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
//     console.log(boardWithCellValues);
//   };

//   // Here, we provide an interface for the rest of our
//   // application to interact with the board
//   return { getBoard, dropToken, printBoard };
// }

// /*
// ** A Cell represents one "square" on the board and can have one of
// ** 0: no token is in the square,
// ** 1: Player One's token,
// ** 2: Player 2's token
// */

// function Cell() {
//   let value = 0;

//   // Accept a player's token to change the value of the cell
//   const addToken = (player) => {
//     value = player;
//   };

//   // How we will retrieve the current value of this cell through closure
//   const getValue = () => value;

//   return {
//     addToken,
//     getValue
//   };
// }

// /* 
// ** The GameController will be responsible for controlling the 
// ** flow and state of the game's turns, as well as whether
// ** anybody has won the game
// */
// function GameController(
//   playerOneName = "Player One",
//   playerTwoName = "Player Two"
// ) {
//   const board = Gameboard();

//   const players = [
//     {
//       name: playerOneName,
//       token: 1
//     },
//     {
//       name: playerTwoName,
//       token: 2
//     }
//   ];

//   let activePlayer = players[0];

//   const switchPlayerTurn = () => {
//     activePlayer = activePlayer === players[0] ? players[1] : players[0];
//   };
//   const getActivePlayer = () => activePlayer;

//   const printNewRound = () => {
//     board.printBoard();
//     console.log(`${getActivePlayer().name}'s turn.`);
//   };

//   const playRound = (column) => {
//     // Drop a token for the current player
//     console.log(
//       `Dropping ${getActivePlayer().name}'s token into column ${column}...`
//     );
//     board.dropToken(column, getActivePlayer().token);

//     /*  This is where we would check for a winner and handle that logic,
//         such as a win message. */

//     // Switch player turn
//     switchPlayerTurn();
//     printNewRound();
//   };

//   // Initial play game message
//   printNewRound();

//   // For the console version, we will only use playRound, but we will need
//   // getActivePlayer for the UI version, so I'm revealing it now
//   return {
//     playRound,
//     getActivePlayer
//   };
// }

// const game = GameController();


////////////////////////////////
// my original code:

// const gameBoard = () => {
//   const rows = 3;
//   const columns = 3;
//   const board = [];

//   for (let i = 0; i < rows; i++) {
//     board[i] = [];
//     for (let j = 0; j < columns; j++) {
//       board[i][j] = '';
//     };
//   };

//   const getBoard = () => board;

//   const placeToken = (row, column, token) => {
//     if (board[row][column]) {
//       return false
//     }
//     board[row][column] = token;
//     return true;
//   };

//   return { getBoard, placeToken }

// };
// const gameController = (() => {

//   const getplayers = () => {
//     const playerOneInput = document.querySelector('#playerOne');
//     const playerTwoInput = document.querySelector('#playerTwo');

//     const playerOneName = playerOneInput.value ? playerOneInput.value : 'Player 1';
//     const playerTwoName = playerTwoInput.value ? playerTwoInput.value : 'Player 2';

//     return [
//       {
//         name: playerOneName,
//         token: "X"
//       },
//       {
//         name: playerTwoName,
//         token: "O"
//       }
//     ]
//   };

//   let board;
//   let players;
//   let activePlayer;
//   let winner;
//   let gameRunning = false;

//   const startGame = () => {
//     board = gameBoard();
//     players = getplayers();
//     activePlayer = players[0];
//     if (winner && winner.name == activePlayer.name) switchPlayer();
//     winner = '';
//     gameRunning = true;
//     console.log(`${activePlayer.name}'s turn`);
//     console.log(board.getBoard());
//   };

//   const playRound = (row, column) => {
//     if (gameRunning) {

//       if (board.placeToken(row, column, activePlayer.token)) {
//         if (checkForWin(activePlayer.token)) {
//           winner = activePlayer;
//           console.log(`${winner.name} won`);
//           gameRunning = false;
//         };
//         if (checkForTie()) {
//           console.log(`That's a tie.`);
//           gameRunning = false;
//         };
//         switchPlayer();
//       };

//       if (gameRunning) console.log(`${activePlayer.name}'s turn`);
//       console.log(board.getBoard());

//     };
//   };

//   const checkForWin = (token) => {
//     const grid = board.getBoard();
//     if (
//       // check rows
//       (
//         grid[0][0] == token &&
//         grid[0][1] == token &&
//         grid[0][2] == token
//       ) ||
//       (
//         grid[1][0] == token &&
//         grid[1][1] == token &&
//         grid[1][2] == token
//       ) ||
//       (
//         grid[2][0] == token &&
//         grid[2][1] == token &&
//         grid[2][2] == token
//       ) ||
//       (
//         // check columns
//         grid[0][0] == token &&
//         grid[1][0] == token &&
//         grid[2][0] == token
//       ) ||
//       (
//         grid[0][1] == token &&
//         grid[1][1] == token &&
//         grid[2][1] == token
//       ) ||
//       (
//         grid[0][2] == token &&
//         grid[1][2] == token &&
//         grid[2][2] == token
//       ) ||
//       (
//         // check for diagonals
//         grid[0][0] == token &&
//         grid[1][1] == token &&
//         grid[2][2] == token
//       ) ||
//       (
//         grid[0][2] == token &&
//         grid[1][1] == token &&
//         grid[2][0] == token
//       )
//     ) {
//       return true
//     };
//     return false
//   };

//   const checkForTie = () => {
//     const grid = board.getBoard();
//     if (
//       !checkForWin() &&
//       grid[0][0] &&
//       grid[0][1] &&
//       grid[0][2] &&
//       grid[1][0] &&
//       grid[1][1] &&
//       grid[1][2] &&
//       grid[2][0] &&
//       grid[2][1] &&
//       grid[2][2]
//     ) return true;
//     return false;
//   };

//   const switchPlayer = () => {
//     activePlayer = activePlayer === players[0] ? players[1] : players[0];
//   };

//   const getBoard = () => board.getBoard();
//   const getActivePlayer = () => activePlayer;
//   const getWinner = () => winner;

//   return { startGame, playRound, getBoard, getplayers, getActivePlayer, getWinner }

// })();

// const screenController = (() => {
//   const game = gameController;  // need: activePlayer, board, winner
//   const startButton = document.querySelector('#startButton');
//   const gameBoardDiv = document.querySelector('#grid');
//   const infoDiv = document.querySelector('#info');

//   const updateScreen = () => {
//     gameBoardDiv.textContent = '';

//     const board = game.getBoard();
//     const activePlayer = game.getActivePlayer();
//     const winner = game.getWinner();
  
//     let infoText = `${activePlayer.name}'s turn`;
//     if (winner) {
//       infoText = `${winner.name} won.`;
//     };
//     infoDiv.textContent = infoText;

//     board.forEach((row, rowIndex) => {
//       row.forEach((cell, columnIndex) => {
//         const cellButton = document.createElement("button");
//         cellButton.classList.add("cell");
//         cellButton.dataset.row = rowIndex;
//         cellButton.dataset.column = columnIndex;
//         cellButton.textContent = cell.valueOf();
//         gameBoardDiv.appendChild(cellButton);
//       });
//     });
//   };

//   const clickEventHandler = (e) => {
//     const selectedRow = e.target.dataset.row;
//     const selectedColumn = e.target.dataset.column;

//     if (!selectedRow && !selectedColumn) return;

//     game.playRound(selectedRow, selectedColumn);
//     updateScreen();
//   };
//   gameBoardDiv.addEventListener('click', clickEventHandler);
//   startButton.addEventListener('click', () => {
//     game.startGame();
//     updateScreen();
//   });

//   game.startGame();
//   updateScreen();

// })();

// game = screenController;
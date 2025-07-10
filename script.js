const gameboard = (function () {
	const gameboard = []
	const gameboardRows = 3
	const gameboardColumns = 3

	function cerateNewGameboard() {
		for (let row = 0; row < gameboardRows; row++) {
			gameboard[row] = []
			for (let col = 0; col < gameboardColumns; col++) {
				gameboard[row][col] = ''
			}
		}
		console.log('new gameboard created')
	}

	const getGameBoard = () => gameboard

	const placeToken = (row, col, token) => {
		if (!gameboard[row][col]) {
			gameboard[row][col] = token
			console.log(token + ' placed at ' + row + ', ' + col)
			return true
		}
		console.log(row + ', ' + col + ' is already taken')
		return false
	}

	return { cerateNewGameboard, getGameBoard, placeToken }
})();

const player = (function () {
	function createPlayer(name, token) {
		return { name, token }
	}

	let player1 = createPlayer('Player 1', 'X')
	let player2 = createPlayer('Player 2', 'O')

	const players = [player1, player2]

	const updatePlayerNames = (p1Name, p2Name) => {
		if (p1Name) player1.name = p1Name
		if (p2Name) player2.name = p2Name
	}


	const getPlayers = () => players

	return { updatePlayerNames, getPlayers }
})();

const game = (function () {
	let currentPlayerIndex = 0
	let gameActive = true

	function switchPlayer() {
		currentPlayerIndex = currentPlayerIndex ? 0 : 1
		console.log(getCurrentPlayer().name + "'s turn")
	}

	const getCurrentPlayer = () => player.getPlayers()[currentPlayerIndex]

	const playRound = (row, col) => {
		if (gameActive) {
			const currentToken = getCurrentPlayer().token
			if (gameboard.placeToken(row, col, currentToken)) {
				screenController.updateDisplay()
				if (checkForWin(currentToken)) {
					console.log('The winner is: ' + getCurrentPlayer().name)
					gameActive = false
					return
				}
				if (checkForTie()) {
					console.log("That's a tie")
					gameActive = false
					return
				}
			}
			switchPlayer()
		}
	}

	const startNewGame = () => {
		gameboard.cerateNewGameboard()
		screenController.updateDisplay()
		currentPlayerIndex = 0
		gameActive = true
	}

	const checkForWin = (token) => {
		const grid = gameboard.getGameBoard()
		if (
			// check rows
			(grid[0][0] == token && grid[0][1] == token && grid[0][2] == token) ||
			(grid[1][0] == token && grid[1][1] == token && grid[1][2] == token) ||
			(grid[2][0] == token && grid[2][1] == token && grid[2][2] == token) ||
			// check columns
			(grid[0][0] == token && grid[1][0] == token && grid[2][0] == token) ||
			(grid[0][1] == token && grid[1][1] == token && grid[2][1] == token) ||
			(grid[0][2] == token && grid[1][2] == token && grid[2][2] == token) ||
			// check for diagonals
			(grid[0][0] == token && grid[1][1] == token && grid[2][2] == token) ||
			(grid[0][2] == token && grid[1][1] == token && grid[2][0] == token)
		) return true
	}

	const checkForTie = () => {
		const grid = gameboard.getGameBoard()
		if (!checkForWin() &&
			grid[0][0] && grid[0][1] && grid[0][2] &&
			grid[1][0] && grid[1][1] && grid[1][2] &&
			grid[2][0] && grid[2][1] && grid[2][2]
		) return true
	}

	return { startNewGame, playRound }
})();

const screenController = (() => {
	const gameboardDisplay = document.querySelector('#gameboard-display')
	const startNewGameButton = document.querySelector('#start-button')
	const playerOneInput = document.querySelector('#player-one-input')
	const playerTwoInput = document.querySelector('#player-two-input')

	const board = gameboard.getGameBoard()

	startNewGameButton.addEventListener('click', startNewGameButtonClickHandler)

	function startNewGameButtonClickHandler() {
		const player1Name = playerOneInput.value
		const player2Name = playerTwoInput.value
		console.log({ player1Name, player2Name })
		player.updatePlayerNames(player1Name, player2Name)
		game.startNewGame()
	}

	gameboardDisplay.addEventListener('click', event => {
		if (event.target.dataset.row && event.target.dataset.col) {
			gameboardButtonClickHandler(event.target)
		}
	})

	function gameboardButtonClickHandler(button) {
		const row = button.dataset.row
		const col = button.dataset.col
		game.playRound(row, col)
	}

	function updateDisplay() {
		resetBoard()
		renderButtons()
	}

	function renderButtons() {
		board.forEach((row, rowIndex) => {
			row.forEach((cellValue, colIndex) => {
				appendButton(cellValue, rowIndex, colIndex)
			})
		});
	}

	function appendButton(token, row, col) {
		const button = document.createElement('button')
		button.innerText = token
		button.dataset.row = row
		button.dataset.col = col
		gameboardDisplay.appendChild(button)
	}

	function resetBoard() {
		gameboardDisplay.innerText = ''
	}

	return { updateDisplay }
})();

game.startNewGame()

function testXWin() {
	game.playRound(0, 0)
	game.playRound(0, 1)
	game.playRound(1, 0)
	game.playRound(1, 1)
	game.playRound(2, 0)
}

function testYWin() {
	game.playRound(0, 0)
	game.playRound(0, 1)
	game.playRound(1, 0)
	game.playRound(1, 1)
	game.playRound(2, 2)
	game.playRound(2, 1)
}

function testTie() {
	game.playRound(0, 0)
	game.playRound(0, 1)
	game.playRound(1, 0)
	game.playRound(1, 1)
	game.playRound(2, 1)
	game.playRound(2, 0)
	game.playRound(0, 2)
	game.playRound(1, 2)
	game.playRound(2, 2)
}
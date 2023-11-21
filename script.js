// Variables to track game state
let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', '']; // Represents the grid

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// ... (Previous code remains the same)

// Function to generate the game board
function createBoard() {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', () => handleMove(i));
      document.getElementById('board').appendChild(cell);
    }
  }
  
  // Call the function to create the board when the script loads
  createBoard();
  

const boardDivs = document.querySelectorAll('.board div');
const resetBtn = document.getElementById('resetBtn');

// Function to handle a player's move
function handleMove(index) {
  if (gameActive && board[index] === '') {
    board[index] = currentPlayer;
    boardDivs[index].textContent = currentPlayer;
    checkResult();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Function to check if there's a winner
function checkResult() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      highlightWinner(winningCombinations[i]);
      break;
    }
  }
}

// Function to highlight the winning combination
function highlightWinner(combination) {
  combination.forEach(index => {
    boardDivs[index].style.color = 'red';
  });
}

// Function to reset the game
function resetGame() {
  currentPlayer = 'X';
  gameActive = true;
  board = ['', '', '', '', '', '', '', '', ''];
  boardDivs.forEach(div => {
    div.textContent = '';
    div.style.color = '#000';
  });
}

// Event listeners
boardDivs.forEach((div, index) => {
  div.addEventListener('click', () => {
    handleMove(index);
  });
});

resetBtn.addEventListener('click', resetGame);

const grid = document.getElementById('grid');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Representação da grade 3x3

// Função para criar a grade
function createGrid() {
    grid.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.dataset.index = i;
        cell.addEventListener('click', () => handleClick(i));
        grid.appendChild(cell);
    }
}

// Função que manipula o clique nas células
function handleClick(index) {
    if (gameBoard[index] !== '') return; // Se a célula já estiver preenchida, não faz nada

    gameBoard[index] = currentPlayer;
    updateGrid();
    if (checkWinner()) {
        setTimeout(() => alert(`${currentPlayer} ganhou!`), 100);
        setTimeout(resetGame, 1000);
    } else if (!gameBoard.includes('')) {
        setTimeout(() => alert('Empate!'), 100);
        setTimeout(resetGame, 1000);
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Função para atualizar a interface com base no estado do jogo
function updateGrid() {
    const cells = grid.querySelectorAll('div');
    cells.forEach((cell, i) => {
        cell.textContent = gameBoard[i];
    });
}

// Função para verificar se há um vencedor
function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Função para reiniciar o jogo
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    createGrid();
    currentPlayer = 'X';
}

resetBtn.addEventListener('click', resetGame);

createGrid();

const dictionary = ['earth', 'plane', 'train', 'dense', 'audio', 'offer', 'climb', 'fluff'];
const gameState = {
    active: false,
    complete: false,
    secret: dictionary[Math.floor(Math.random() * dictionary.length)],
    grid: Array(6).fill().map(() => Array(5).fill('')),
    currRow: 0,
    currCol: 0,
};

function drawBox(container, row, col, letter = '') {
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${col}`;
    box.textContent = letter;

    container.appendChild(box);
    return box;
}

function drawGrid(container) {
    const grid = document.createElement('div');
    grid.id = 'wordle-grid';

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            drawBox(grid, i, j)
        }
    }

    container.appendChild(grid);
}

function updateGrid() {
    for (let i = 0; i < gameState.grid.length; i++) {
        for (let j = 0; j < gameState.grid[i].length; j++) {
            const box = document.getElementById(`box${i}${j}`);
            box.textContent = gameState.grid[i][j];
        }
    }
}

function processWord(guess) {
    const row = gameState.currRow;

    for (let i = 0; i < 5; i++) {
        const box = document.getElementById(`box${row}${i}`);
        const letter = box.textContent;
        
        if (letter === gameState.secret[i]) {
            box.classList.add('right');
        }
        else if (gameState.secret.includes(letter)) {
            box.classList.add('wrong');
        }
        else {
            box.classList.add('empty')
        }
    }

    const isWinner = gameState.secret === guess;
    const isGameOver = gameState.currentRow === 5;

    if (isWinner) {
        alert('CONGRATULATIONS!!!')
        gameState.complete = true;
    } 
    else if (isGameOver) {
        alert (`Game Over. The correct word was ${gameState.secret} :(`)
        gameState.complete = true;
    }
}

function registerEvents() {
    gameCard = document.getElementById('wordle-card');
    gameCard.onmouseover = () => {
        gameState.active = true;
    }
    gameCard.onmouseleave = () => {
        gameState.active = false;
    }
    document.body.onkeydown = (e) => {
        if (gameState.active && !gameState.complete) {
            const key = e.key;
            // If a single letter has been pressed and the current row isn't full
            if (key.length === 1 && (/[a-z]/i).test(key) && gameState.currCol !== 5) {
                gameState.grid[gameState.currRow][gameState.currCol] = key.toLowerCase();
                gameState.currCol++;
                updateGrid();
            }
            // If backspace has been pressed and the current row isn't empty
            if (key === 'Backspace' && gameState.currCol !== 0) {
                gameState.grid[gameState.currRow][gameState.currCol - 1] = '';
                gameState.currCol--;
                updateGrid();
            }
            // If enter has been pressed and current row is full
            if (key === 'Enter' && gameState.currCol === 5) {
                const currWord = gameState.grid[gameState.currRow].reduce((prev, curr) => prev + curr);
                if (dictionary.includes(currWord)) {
                    processWord();
                    gameState.currRow++;
                    gameState.currCol = 0;
                    updateGrid();
                }
                else {
                    alert('INVALID WORD, TRY AGAIN');
                }
            }
        }
    }
}

function startGame() {
    const game = document.getElementById('wordle-card');
    drawGrid(game);

    registerEvents();
}

startGame();
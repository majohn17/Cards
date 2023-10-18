const dictionary = ['earth', 'plane', 'train', 'dense', 'audio', 'offer', 'climb', 'fluff']
const gameState = {
    active: false,
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

function getCurrentWord() {
    return gameState.grid[gameState.currRow].reduce((prev, curr) => prev + curr);
}

function isValidWord(word) {
    return dictionary.includes(word);
}

function revealWord(guess) {
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
    } 
    else if (isGameOver) {
        alert (`Game Over. The correct word was ${gameState.secret} :(`)
    }
}

function isLetter(key) {
    return key.length === 1 && key.match(/[a-z]/i);
}

function addLetter(letter) {
    if (gameState.currCol === 5) return;
    gameState.grid[gameState.currRow][gameState.currCol] = letter;
    gameState.currCol++;
}

function removeLetter(letter) {
    if (gameState.currCol === 0) return;
    gameState.grid[gameState.currRow][gameState.currCol - 1] = '';
    gameState.currCol--;
}

function registerKeyboardEvents() {
    gameCard = document.getElementById('wordle-card');
    gameCard.onmouseover = () => {
        gameState.active = true;
    }
    gameCard.onmouseout = () => {
        gameState.active = false;
    }
    document.body.onkeydown = (e) => {
        if (gameState.active) {
            const key = e.key;
            if (key === 'Enter') {
                if (gameState.currCol === 5) {
                    const word = getCurrentWord();
                    if (isValidWord(word)) {
                        revealWord();
                        gameState.currRow++;
                        gameState.currCol = 0;
                    }
                    else {
                        alert('INVALID WORD, TRY AGAIN')
                    }
                }
            }
            if (key === 'Backspace') {
                removeLetter();
            }
            if (isLetter(key)) {
                addLetter(key);
            }
    
            updateGrid();
        }
    }
}

function startGame() {
    const game = document.getElementById('wordle-card');
    drawGrid(game);

    registerKeyboardEvents();
}

startGame();
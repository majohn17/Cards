var words = [];
const gameState = {
    active: false,
    complete: false,
    word: words[Math.floor(Math.random() * words.length)],
    grid: Array(6).fill().map(() => Array(5).fill('')),
    currRow: 0,
    currCol: 0,
};

function readFile(file)
{
    var f = new XMLHttpRequest();
    f.open("GET", file, false);
    f.onreadystatechange = function () {
        if(f.readyState === 4) {
            if(f.status === 200 || f.status == 0) {
                var res = f.responseText;
                return res;
            }
        }
    }
    f.send(null);
}

function drawBox(container, row, col, letter = '') {
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${col}`;
    box.textContent = letter;

    container.appendChild(box);
    return box;
}

function drawGame(container) {
    const grid = document.createElement('div');
    grid.id = 'wordle-grid';

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            drawBox(grid, i, j)
        }
    }

    container.appendChild(grid);
}

function updateGame() {
    for (let i = 0; i < gameState.grid.length; i++) {
        for (let j = 0; j < gameState.grid[i].length; j++) {
            const box = document.getElementById(`box${i}${j}`);
            box.textContent = gameState.grid[i][j];
        }
    }
}

function processGuess(guess) {
    const row = gameState.currRow;
    const anim_len = 500;

    for (let i = 0; i < 5; i++) {
        const box = document.getElementById(`box${row}${i}`);
        const letter = box.textContent;
        
        setTimeout(() => {
            if (letter === gameState.word[i]) {
                box.classList.add('right');
            }
            else if (gameState.word.includes(letter)) {
                box.classList.add('wrong');
            }
            else {
                box.classList.add('empty');
            }
        }, ((i + 1) * anim_len) / 2);

        box.classList.add('box-animate');
        box.style.animationDelay = `${(i * anim_len) / 2}ms`;
    }

    const isWinner = gameState.word === guess;
    const isGameOver = gameState.currRow === 5;

    setTimeout(() => {
        if (isWinner) {
            alert('CONGRATULATIONS!!!');
            gameState.complete = true;
        } 
        else if (isGameOver) {
            alert(`Game Over. The correct word was ${gameState.word} :(`);
            gameState.complete = true;
        }
    }, 3 * anim_len);
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
                updateGame();
            }
            // If backspace has been pressed and the current row isn't empty
            if (key === 'Backspace' && gameState.currCol !== 0) {
                gameState.grid[gameState.currRow][gameState.currCol - 1] = '';
                gameState.currCol--;
                updateGame();
            }
            // If enter has been pressed and current row is full
            if (key === 'Enter' && gameState.currCol === 5) {
                const currGuess = gameState.grid[gameState.currRow].reduce((prev, curr) => prev + curr);
                if (words.includes(currGuess)) {
                    processGuess(currGuess);
                    gameState.currRow++;
                    gameState.currCol = 0;
                    updateGame();
                }
                else {
                    alert('INVALID WORD, TRY AGAIN');
                }
            }
        }
    }
}

async function startGame() {
    const game = document.getElementById('wordle-card');
    drawGame(game);

    const res = await fetch("../data/words.txt");
    const data = await res.text();
    words = data.split('\n');
    gameState.word = words[Math.floor(Math.random() * words.length)];

    registerEvents();
}

startGame();
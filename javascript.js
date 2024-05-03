function generatePlayer(name, marker) {
    let selection = [];
    const reset = function() {
        selection.length = 0;
    };
    return {name, marker, selection, reset};
};

let player1 = generatePlayer('Bob', 'x');
let player2 = generatePlayer('Sam', 'o');

let currentPlayer;
currentPlayer = player1;

const cellAll = document.querySelectorAll('div#grid > div');
const display = document.querySelector('#display');
const resetBtn = document.querySelector('#reset');


cellAll.forEach(cell => {
    cell.addEventListener('click', () => {
        if ((cell.textContent !== '') ||
            (display.textContent !== '')) {
            return;
        };
        cell.textContent = currentPlayer.marker;
        currentPlayer.selection.push(cell.id);
        checkWin();
        swapPlayer();
    });   
});

function swapPlayer() {
    if (currentPlayer === player1) {
        currentPlayer = player2;
    } else {
        currentPlayer = player1;
    };
};

function checker(arr, target) {
    return target.every(v => arr.includes(v));
};

function checkWin() {
    for (let state of winState) {
        if (checker(currentPlayer.selection, state)) {
            display.textContent = `${currentPlayer.name} is the winner.`;
        };
    };
};


resetBtn.addEventListener('click', () => {
    cellAll.forEach(cell => {
        cell.textContent = '';
    });
    player1.reset();
    player2.reset();
    display.textContent = '';
    currentPlayer = player1;    
});

const winState = [
    ['1','2','3'],
    ['4','5','6'],
    ['7','8','9'],
    ['1','4','7'],
    ['2','5','8'],
    ['3','6','9'],
    ['1','5','9'],
    ['3','5','7']
];


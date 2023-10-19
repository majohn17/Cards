var active = false;
var oper = false;
var activeBtn = null;
var currOper = '';
var savedNum = '';
var neg = false;
var dec = false;

function processNum (num) {
    const display = document.querySelector('#calc-display input');
    if (display.value.length < 15 && !neg || display.value.length < 16 && neg) {
        display.value = display.value + num;
    }
}

function processNeg () {
    const display = document.querySelector('#calc-display input');
    if (display.value.length > 0) {
        if (neg) {
            display.value = display.value.slice(1);
            neg = false;
        }
        else {
            display.value = '-' + display.value;
            neg = true;
        }
    }
}

function processDec () {
    const display = document.querySelector('#calc-display input');
    if (!dec && display.value.length > 0 && !neg|| !dec && display.value.length > 1 && neg) {
        dec = true;
        display.value = display.value + '.';
    }
}

function processDel () {
    const display = document.querySelector('#calc-display input');
    if (display.value.length > 0) {
        if (display.value.charAt(display.value.length - 1) == '.') {
            dec = false;
        }
        if (display.value.length == 2 & neg) {
            neg = false;
            display.value = '';
        }
        else {
            display.value = display.value.slice (0, -1);
        }
    }
}

function processOp (op, btn) {
    const display = document.querySelector('#calc-display input');
    if (!oper && display.value.length > 0) {
        savedNum = display.value;
        display.value = '';
        oper = true;
        currOper = op;
        activeBtn = btn;
        activeBtn.style.background = '#606060';
        dec = false;
        neg = false;
    }
    else if (oper && display.value.length == 0) {
        currOper = op;
        activeBtn.style.background = '#000000'
        activeBtn = btn;
        activeBtn.style.background = '#606060'
    }
}

function calcEquation () {
    const display = document.querySelector('#calc-display input');
    if(oper && display.value.length > 0) {
        currOper != '^' ?  display.value = eval(savedNum + currOper + display.value) : display.value = Math.pow(savedNum, display.value);
        display.value < 0 ? neg = true : neg = false;
        display.value.includes('.') ? dec = true : dec = false;
        activeBtn.style.background = '#000000';
        savedNum = display.value;
        oper = false;
    }
}

function clearAll () {
    document.querySelector('#calc-display input').value = '';
    if (activeBtn !== null) activeBtn.style.background = '#000000';
    oper = false;
    activeBtn = null;
    currOper = '';
    savedNum = '';
    neg = false;
    dec = false;
}

function registerUnfocus() {
    calcCard = document.getElementById('calc-card');
    calcCard.onmouseover = () => {
        active = true;
    }
    calcCard.onmouseleave = () => {
        active = false;
        clearAll();
    }
}

registerUnfocus();
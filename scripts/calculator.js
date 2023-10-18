var oper = false;
var active;
var currOper = "";
var savedNum = "";
var neg = false;
var dec = false;
function processNum (num, doc) {
    var display = doc.querySelector('#calc-display input');
    if (display.value.length < 15 && !neg || display.value.length < 16 && neg) {
        display.value = display.value + num;
    }
}
function processNeg (doc) {
    var display = doc.querySelector('#calc-display input');
    if (display.value.length > 0) {
        if (neg) {
            display.value = display.value.slice(1);
            neg = false;
        }
        else {
            display.value = "-" + display.value;
            neg = true;
        }
    }
}
function processDec (doc) {
    var display = doc.querySelector('#calc-display input');
    if (!dec && display.value.length > 0 && !neg|| !dec && display.value.length > 1 && neg) {
        dec = true;
        display.value = display.value + ".";
    }
}
function processDel (doc) {
    var display = doc.querySelector('#calc-display input');
    if (display.value.length > 0) {
        if (display.value.charAt(display.value.length - 1) == ".") {
            dec = false;
        }
        if (display.value.length == 2 & neg) {
            neg = false;
            display.value = "";
        }
        else {
            display.value = display.value.slice (0, -1);
        }
    }
}
function processOp (op, doc, btn) {
    var display = doc.querySelector('#calc-display input');
    if (!oper && display.value.length > 0) {
        savedNum = display.value;
        display.value = "";
        oper = true;
        currOper = op;
        active = btn;
        active.style.background = "#606060";
        dec = false;
        neg = false;
    }
    else if (oper && display.value.length == 0) {
        currOper = op;
        active.style.background = "#000000"
        active = btn;
        active.style.background = "#606060"
    }
}
function calcEquation (doc) {
    var display = doc.querySelector('#calc-display input');
    if(oper && display.value.length > 0) {
        var temp;
        currOper != "^" ?  display.value = eval(savedNum + currOper + display.value) : display.value = Math.pow(savedNum, display.value);
        display.value < 0 ? neg = true : neg = false;
        display.value.includes('.') ? dec = true : dec = false;
        active.style.background = "#000000";
        savedNum = display.value;
        oper = false;
    }
}
function clearAll (doc) {
    doc.querySelector('#calc-display input').value = "";
    active.style.background = "#000000";
    var oper = false;
    var currOper = "";
    var savedNum = "";
    var neg = false;
    var dec = false;
}
let display = document.getElementById('result');
let historyDisplay = document.getElementById('history');

let currentInput = '0';
let expression = '';
let lastInputType = '';
let resultShown = false;


document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => handleButton(button.value));
});

function handleButton(value) {
    if (isNumber(value)) {
        inputNumber(value);
    } else if (value === '.') {
        inputDecimal();
    } else if (isOperator(value)) {
        inputOperator(value);
    } else if (value === '=') {
        calculate();
    } else if (value === 'C') {
        clear();
    } else if (value === '⌫') {
        backspace();
    }
    updateDisplay();
}

function inputNumber(num) {
    if (resultShown) {
        currentInput = num;
        expression = '';
        resultShown = false;
    } else if (lastInputType === 'operator') {
        currentInput = num;
    } else {
        if (currentInput === '0') {
            currentInput = num;
        } else {
            currentInput += num;
        }
    }
    lastInputType = 'number';
}

function inputDecimal() {
    if (resultShown || lastInputType === 'operator') {
        currentInput = '0.';
        resultShown = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    lastInputType = 'decimal';
}

function inputOperator(op) {
    if (op === '%') {
        currentInput = (parseFloat(currentInput) / 100).toString();
        lastInputType = 'percent';
        return;
    }
    if (lastInputType === 'operator') {
        expression = expression.slice(0, -1) + op;
    } else {
        expression += (expression === '' ? '' : ' ') + currentInput + ' ' + op;
    }
    lastInputType = 'operator';
    resultShown = false;
}

function calculate() {
    if (lastInputType === 'operator') {
        expression = expression.slice(0, -1);
    } else {
        expression += (expression === '' ? '' : ' ') + currentInput;
    }
    try {
        let safeExpr = expression.replace(/×/g, '*').replace(/÷/g, '/');
        let result = eval(safeExpr);
        if (result === Infinity || isNaN(result)) {
            currentInput = 'Error';
        } else {
            currentInput = result.toString();
        }
        resultShown = true;
    } catch {
        currentInput = 'Error';
        resultShown = true;
    }
    expression = '';
    lastInputType = 'equal';
}

function clear() {
    currentInput = '0';
    expression = '';
    lastInputType = '';
    resultShown = false;
}

function backspace() {
    if (resultShown || lastInputType === 'operator') return;
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
}

function updateDisplay() {
    if (historyDisplay) {
        if (resultShown) {
            historyDisplay.textContent = '';
        } else {
            historyDisplay.textContent = expression ? expression + (lastInputType === 'operator' ? '' : ' ' + currentInput) : '';
        }
    }
    display.value = currentInput;
}

function isNumber(value) {
    return /^[0-9]$/.test(value);
}

function isOperator(value) {
    return ['+', '-', '*', '/', '×', '÷', '%'].includes(value);
}

updateDisplay();
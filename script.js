let display = document.getElementById('result');
let historyDisplay = document.getElementById('history');

let currentInput = '0';
let expression = '';
let lastInputType = '';
let resultShown = false;

document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => handleButton(button.value));
});

// Memory functions removed

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
    
    // Memory conditions removed
    
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

// Replace the calculate function with this improved version

function calculate() {
    if (lastInputType === 'operator') {
        expression = expression.slice(0, -1);
    } else {
        expression += (expression === '' ? '' : ' ') + currentInput;
    }
    
    try {
        // Replace × and ÷ with * and /
        let safeExpr = expression.replace(/×/g, '*').replace(/÷/g, '/');
        
        // Validate expression before evaluation
        if (!isValidExpression(safeExpr)) {
            throw new Error("Invalid expression");
        }
        
        // Use Function constructor instead of eval for better security
        const result = Function('"use strict"; return (' + safeExpr + ')')();
        
        if (!isFinite(result) || isNaN(result)) {
            currentInput = 'Error';
        } else {
            // Format the result to avoid extremely long decimals
            currentInput = formatResult(result);
        }
        resultShown = true;
    } catch (error) {
        console.error("Calculation error:", error);
        currentInput = 'Error';
        resultShown = true;
    }
    
    expression = '';
    lastInputType = 'equal';
}

// Add these helper functions
function isValidExpression(expr) {
    // Basic validation to prevent malicious code execution
    return /^[\d\s+\-*/.()]+$/.test(expr);
}

function formatResult(result) {
    // Convert to string with appropriate precision
    if (Number.isInteger(result)) {
        return result.toString();
    } else {
        // Limit to 10 significant digits to avoid floating point issues
        const precision = 10 - Math.floor(Math.log10(Math.abs(result)));
        return result.toFixed(Math.max(0, precision));
    }
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

// Add keyboard support - place this after your existing event listeners

document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Prevent default behavior for calculator keys
    if (/[\d+\-*/.%=]|Enter|Backspace|Escape/.test(key)) {
        event.preventDefault();
    }
    
    // Map keyboard keys to calculator functions
    if (/\d/.test(key)) {
        handleButton(key);
    } else if (key === '.') {
        handleButton('.');
    } else if (['+', '-', '*', '/'].includes(key)) {
        handleButton(key);
    } else if (key === '%') {
        handleButton('%');
    } else if (key === 'Enter' || key === '=') {
        handleButton('=');
    } else if (key === 'Escape') {
        handleButton('C');
    } else if (key === 'Backspace') {
        handleButton('⌫');
    }
    
    // Add visual feedback for the pressed button
    const buttonValue = key === 'Enter' ? '=' : (key === 'Escape' ? 'C' : key);
    const button = Array.from(document.querySelectorAll('.buttons button'))
        .find(btn => btn.value === buttonValue);
    
    if (button) {
        button.classList.add('button-press');
        setTimeout(() => button.classList.remove('button-press'), 200);
    }
});

updateDisplay();

// Theme toggle functionality
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    
    // Save theme preference
    const isDarkTheme = document.body.classList.contains('dark-theme');
    localStorage.setItem('darkTheme', isDarkTheme);
    
    // Update toggle button text
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.textContent = isDarkTheme ? '☀️' : '🌙';
}

// Load saved theme preference
function loadTheme() {
    const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
    if (isDarkTheme) {
        document.body.classList.add('dark-theme');
    }
    
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = isDarkTheme ? '☀️' : '🌙';
    }
}

// Call this when the DOM is loaded
document.addEventListener('DOMContentLoaded', loadTheme);
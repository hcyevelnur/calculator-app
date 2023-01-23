const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let silme = '0';
let birincidəyər = null;
let operator = null;
let ikincidəyər = false;

updateDisplay();

function updateDisplay() {
    display.value = silme;
}

keys.addEventListener('click', function(e) {
    const element = e.target;
    const value = element.value;

    if (!element.matches('button')) return;

    switch(value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal();
            break;
        case 'clear':
            clear();
            break;
        default:
            inputNumber(element.value);        
    }
    updateDisplay();
});

function handleOperator(nextOperator) {
    const value = parseFloat(silme);

    if(operator && ikincidəyər) {
        operator = nextOperator;
        return;
    }

    if (birincidəyər === null) {
        birincidəyər = value;
    } else if (operator) {
        const result = calculate(birincidəyər, value, operator);

        silme = `${parseFloat(result.toFixed(7))}`;
        birincidəyər = result;
    }

    ikincidəyər = true;
    operator = nextOperator;

    console.log(silme, birincidəyər, operator, ikincidəyər);
}

function calculate(first, second, operator) {
    if(operator === '+') {
        return first + second;
    } else if (operator === '-') {
        return first - second;
    } else if (operator === '*') {
        return first * second
    } else if (operator === '/') {
        return first / second;
    }
    return second;
}

function inputNumber(num) {
    if(ikincidəyər) {
        silme = num;
        ikincidəyər = false;
    } else {
        silme = silme === '0'? num: silme + num;
    }

    console.log(silme, birincidəyər, operator, ikincidəyər);
}

function inputDecimal() {
    if (!silme.includes('.')) {
        silme += '.';
    }
}

function clear() {
    silme = '0';
}
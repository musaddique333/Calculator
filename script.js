document.addEventListener('DOMContentLoaded', function() {
    const addbtn = document.getElementById('add');
    const subbtn = document.getElementById('subtract');
    const mulbtn = document.getElementById('multiply');
    const divbtn = document.getElementById('divide');
    const equalbtn = document.getElementById('equals');
    const dotbtn = document.getElementById('decimal');
    const clearbtn = document.getElementById('clear');
    const delbtn = document.getElementById('backspace');
    const numbtns = document.querySelectorAll('.num');
    let btns = document.querySelectorAll('button');
    let ansScreen = document.getElementById('ansScreen');
    let prevScreen = document.getElementById('prevScreen');


    // play sound when button is clicked
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.id === 'equals') {
                let audio = new Audio('./equals.mp3');
                audio.play();
            }
            else{
                let audio = new Audio('./click.mp3');
                audio.play();
            }
        });
    });

    let prevOperand = '';
    let currOperand = '';
    let operator = undefined;
    let ans = 0;
    let prevAns = 0;

    function updateScreen() {
        ansScreen.innerText = currOperand;
        prevScreen.innerText =  operator !== undefined ? `${prevOperand} ${operator}` : '';
    } 

    function clear() {
        currOperand = '';
        prevOperand = '';
        operator = undefined;
    }

    function backspace() {
        currOperand = currOperand.toString().slice(0, -1);
    }

    function appendNum(num) {
        if (num === '.' && currOperand.includes('.')) return;
        currOperand = currOperand.toString() + num.toString();
    }

    function chooseOperator(op) {
        if (currOperand === '') return;
        if (prevOperand !== '') {
            compute();
        }
        operator = op;
        prevOperand = currOperand;
        currOperand = '';
    }

    function compute() {
        let computation;
        const prev = parseFloat(prevOperand);
        const curr = parseFloat(currOperand);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (operator) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '/':
                computation = prev / curr;
                break;
            default:
                return;
        }
        ans = computation;
        operator = undefined;
        currOperand = computation;
        prevOperand = '';
    }

    function updateAns() {
        prevAns = ans;
    }

    function displayAns() {
        currOperand = ans;
    }

    numbtns.forEach(btn => {
        btn.addEventListener('click', () => {
            appendNum(btn.innerText);
            updateScreen();
        });
    });

    addbtn.addEventListener('click', () => {
        chooseOperator('+');
        updateScreen();
    });

    subbtn.addEventListener('click', () => {
        chooseOperator('-');
        updateScreen();
    });

    mulbtn.addEventListener('click', () => {
        chooseOperator('*');
        updateScreen();
    });
    
    divbtn.addEventListener('click', () => {
        chooseOperator('/');
        updateScreen();
    });

    equalbtn.addEventListener('click', () => {
        compute();
        updateAns();
        displayAns();
        updateScreen();
    });

    clearbtn.addEventListener('click', () => {
        clear();
        updateScreen();
    });

    delbtn.addEventListener('click', () => {
        backspace();
        updateScreen();
    });

    dotbtn.addEventListener('click', () => {
        appendNum('.');
        updateScreen();
    });
});
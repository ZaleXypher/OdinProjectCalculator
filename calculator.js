function add(x, y){
    return x + y
}

function subtr(x, y){
    return x - y
}

function mult(x, y){
    return x * y
}

function div(x, y){
    if(x == 0 || y == 0){
        preview.textContent = 'Cannot divide by zero'
        setTimeout(reset, 1500)
    }
    isFloat = true
    return x / y
}

function calc(x, y, operator){
    switch(operator){
        case '+':
            return add(x,y)
        case '-':
            return subtr(x,y)
        case '*':
            return mult(x,y)
        case '/':
            return div(x,y)
    }
}

function findPriority(operator){
    if(operator == "*" || operator == "/"){
        return true
    }
}

function runCalc(){
    saveCurrNum()
    if(operators.length > numbers.length-1){
        operators.pop()
    }

    while(operators.find(findPriority)){
        let priCalc = operators.findIndex(findPriority)
        let calced = calc(numbers[priCalc], numbers[priCalc+1], operators[priCalc])
        numbers.splice(priCalc, 2, calced)
        operators.splice(priCalc, 1)
    }

    accumulator = numbers[0]
    for(let i = 0;i < operators.length; i++){
        accumulator = parseFloat(calc(accumulator, numbers[i+1], operators[i]))
    }
    numbers = []
    numbers.push(accumulator)
    console.log(numbers)
    console.log(operators)
    preview.textContent = accumulator
}

function reset(){
    sum = ''
    numbers = []
    operators = []
    currNum = ''
    accumulator = 0
    preview.textContent = '0'
}

function delLast(){
    let changed = currNum.substring(0, currNum.length - 1)
    currNum = changed
    preview.textContent = currNum
}

function saveCurrNum(){
    numbers.push(parseFloat(currNum))
    currNum = ''
    preview.textContent = 0
}

function saveOperator(operator){
    if(currNum == 0){
        return 0
    }
    saveCurrNum()
    operators.push(operator.target.textContent)
}

function currVal(keypad){
    currNum = currNum + keypad.target.textContent
    preview.textContent = currNum
    console.log(currNum)
}

const preview = document.querySelector(".preview")
const keypad = document.querySelectorAll(".keypad")
const opera = document.querySelectorAll(".operators")
const result = document.querySelector("#result")
const clear = document.querySelector("#clear")
const del = document.querySelector("#del")
for(let i = 0; i < keypad.length; i++){
    keypad[i].addEventListener("click", currVal)
}

for(let i = 0; i < opera.length; i++){
    opera[i].addEventListener("click", saveOperator)
}

let sum = ''
let numbers = []
let operators = []
let currNum = ''
let accumulator = 0

del.addEventListener("click", delLast)
clear.addEventListener("click", reset)
result.addEventListener("click", runCalc)

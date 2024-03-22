
let numOfSquares= 8;

let gridSize = 400;

let squareSize = gridSize/numOfSquares;

color = '#000000'

let buttonContainer = document.createElement('div');
buttonContainer.setAttribute('id', 'button-container');

let gridContainer = document.querySelector('#grid-container');
let square = document.createElement("div");
let eraseButton = document.createElement('button');
let sizeField = document.createElement('input');
let sizeButton = document.createElement('button')
let colorField = document.createElement('input');
let colorButton = document.createElement('button');



//square relevant stuff
square.setAttribute("class", "square");

refresh(numOfSquares);
//grid relevant stuff

gridContainer.style.cssText = `height: ${gridSize}px; width: ${gridSize}px;` ;

gridContainer.addEventListener('mouseover', (event) => {

    if (event.target.classList.contains('square') && event.buttons === 1) {
        event.preventDefault;
        event.target.style.backgroundColor = color;
    }

}, true);



//function button relevant stuff

sizeField.setAttribute('type', 'number');
sizeField.setAttribute('id', 'size-field');
sizeField.value = numOfSquares;

sizeButton.setAttribute('id', 'size-button');
sizeButton.textContent = "change size";

eraseButton.setAttribute('id', 'erase-button')
eraseButton.textContent = "erase";

colorField.setAttribute('type', 'color');
colorField.setAttribute('id', 'color-field');
colorField.value = color;

colorButton.setAttribute('id', 'color-button');
colorButton.textContent = "Choose Color";

buttonContainer.appendChild(sizeField);
buttonContainer.appendChild(sizeButton);
buttonContainer.appendChild(eraseButton);
buttonContainer.appendChild(colorField);
buttonContainer.appendChild(colorButton);

document.body.insertBefore(buttonContainer, gridContainer);

sizeButton.addEventListener('click', () => {
    numOfSquares = sizeField.value;
    refresh(numOfSquares);

});

eraseButton.addEventListener('click', () => {

    let squares = document.querySelectorAll('.square');

    squares.forEach((square) => {
        square.style.backgroundColor = 'white';
    });

});

colorButton.addEventListener('click', () => {
    color = colorField.value;
})

//document relevant stuff 

document.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('square')) {
        event.preventDefault();
        event.target.style.backgroundColor = color;
    }
}, true);

function changeSquareColor(target, color) {
    if (target.classList.contains('square')) {
        target.style.backgroundColor = color;
    }
}

function refresh(numOfSquares) {
    
    if(numOfSquares <= 0 || numOfSquares > 100) {
        alert("Please select a value between 1 and 100");
        return;
    }

    let squareSize = gridSize/numOfSquares

    let squares = document.querySelectorAll('.square');
    
    squares.forEach((oldSquare) => {
        gridContainer.removeChild(oldSquare);
    });

    for (let i = 0; i < numOfSquares**2; i++) {

        let squareClone = square.cloneNode(true);
    
        squareClone.style.cssText = `height: ${squareSize}px; width: ${squareSize}px;
        flex: 0 0 ${squareSize}px;`;
    
        gridContainer.appendChild(squareClone);
    
    }
    
}

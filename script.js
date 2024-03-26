
let numOfSquares= 8;

let gridSize = 400;

let squareSize = gridSize/numOfSquares;

let color = 'rgb(0, 0, 0)';

let buttonContainer = document.createElement('div');
buttonContainer.setAttribute('id', 'button-container');

buttonContainer.style.cssText = "display: flex; flex-direction: row; flex: 1; gap: 20px;margin: 20px; align-items: center;";


let gridContainer = document.querySelector('#grid-container');
let square = document.createElement("div");
let eraseButton = document.createElement('button');
let sizeField = document.createElement('input');
let sizeButton = document.createElement('button');
let colorField = document.createElement('input');
let fillCheck = document.createElement('input');
let rainbowCheck = document.createElement('input');
let opacityCheck = document.createElement('input');


//square relevant stuff
square.setAttribute("class", "square");

refresh(numOfSquares);
//grid relevant stuff

gridContainer.style.cssText = `height: ${gridSize}px; width: ${gridSize}px;` ;

gridContainer.addEventListener('mouseover', (event) => {
    if (event.target.classList.contains('square')) {
        event.preventDefault();
        changeSquareColor(event.target, event);
    }
}, true);

document.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('square')) {
        event.preventDefault();
        changeSquareColor(event.target, event);
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

rainbowCheck.setAttribute('type', 'checkbox');

opacityCheck.setAttribute('type', 'checkbox');



fillCheck.setAttribute('type', 'checkbox');
fillCheck.setAttribute('id', 'fill-check');

let fillSpan = document.createElement('span');
fillSpan.textContent ="fill toggle:"

buttonContainer.appendChild(sizeField);
buttonContainer.appendChild(sizeButton);
buttonContainer.appendChild(eraseButton);
buttonContainer.appendChild(colorField);
buttonContainer.appendChild(fillSpan);
buttonContainer.appendChild(fillCheck);
buttonContainer.appendChild(rainbowCheck);
buttonContainer.appendChild(opacityCheck);

document.body.insertBefore(buttonContainer, gridContainer);

sizeButton.addEventListener('click', () => {
    numOfSquares = sizeField.value;
    refresh(numOfSquares);

});

eraseButton.addEventListener('click', () => {

    let squares = document.querySelectorAll('.square');

    squares.forEach((square) => {
        square.style.backgroundColor = 'rgb(255,255,255)';
    });

});

colorField.addEventListener('change', () => {
    color = hexToRGB(colorField.value);
    console.log(color);
})

//document relevant stuff 

  
function changeSquareColor(square, event) {
    // Force apply for flood fill on mouse down
    if (fillCheck.checked && event.type === 'mousedown') {
        let targetSquare = square;
        let targetIndex = Array.from(gridContainer.children).indexOf(targetSquare);
        let targetCol = targetIndex % numOfSquares;
        let targetRow = Math.floor(targetIndex/numOfSquares);
        let targetColor = targetSquare.style.backgroundColor || "rgb(0, 0, 0)";
        let fillColor = color;

        if (targetColor != fillColor) {
            performFloodFill(targetSquare, targetRow, targetCol, targetColor, fillColor, numOfSquares);
        }
    }
    // Handle other modes on mouseover with mouse button pressed or directly on mousedown
    else if (event.buttons === 1 || event.type === 'mousedown') {
        if (rainbowCheck.checked) {
            square.style.backgroundColor = randomRGB();
            square.style.opacity = '1'; // Reset opacity for non-opacity modes
        } else if (opacityCheck.checked) {
            changeOpacity(square, color);
        } else {
            square.style.backgroundColor = color;
            square.style.opacity = '1'; // Reset opacity for non-opacity modes
        }
    }
}
function changeOpacity(target, color) {

    if (target.style.backgroundColor !== color) {
        target.style.backgroundColor = color;
        target.style.opacity = '0.2';
    }
    
    let currentOpacity = parseFloat(target.style.opacity) || 1;

    
    currentOpacity = Math.min(currentOpacity += 0.1, 1);
    target.style.opacity = currentOpacity.toString();
    
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
        flex: 0 0 ${squareSize}px; background-color: rgb(255,255,255)`;
    
        gridContainer.appendChild(squareClone);
    
    }
    
}

function randomRGB() {
    let r, g, b;

    r = Math.floor(Math.random()*255);
    g = Math.floor(Math.random()*255);
    b = Math.floor(Math.random()*255);

    return `rgb(${r}, ${g}, ${b})`;
}
function hexToRGB(color) {

    let r, g, b;

    r = parseInt(color.substring(1, 3), 16);
    g = parseInt(color.substring(3, 5), 16);
    b = parseInt(color.substring(5, 7), 16);

    return `rgb(${r}, ${g}, ${b})`;
}

function indexFromRowCol(row, col, numOfSquares) {
    return (row * numOfSquares) + col;

}

function performFloodFill (square, row, col, targetColor, fillColor, numOfSquares) {
    if (row < 0 || col < 0 || row >= numOfSquares || col >= numOfSquares) return;

    let currentIndex = indexFromRowCol(row, col, numOfSquares);
    let currentSquare = gridContainer.children[currentIndex];
    if (currentSquare.style.backgroundColor !== targetColor && currentSquare.style.backgroundColor !== "") return;

    currentSquare.style.backgroundColor = fillColor;

    performFloodFill(square, row-1, col, targetColor, fillColor, numOfSquares);
    performFloodFill(square, row+1, col, targetColor, fillColor, numOfSquares);
    performFloodFill(square, row, col+1, targetColor, fillColor, numOfSquares);
    performFloodFill(square, row, col-1, targetColor, fillColor, numOfSquares);
    
}


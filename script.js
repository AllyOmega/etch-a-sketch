
let numOfSquares= 10;

let gridSize = 400;

let squareSize = Math.floor(gridSize/numOfSquares);

let gridContainer = document.querySelector('#grid-container');
let square = document.createElement("div");
let eraseButton = document.createElement('button');

//square relevant stuff
square.setAttribute("class", "square");

for (let i = 0; i <= numOfSquares**2 - 1; i++) {

    let squareClone = square.cloneNode(true);

    squareClone.style.cssText = `height: ${squareSize}px; width: ${squareSize}px;
    flex: 0 0 ${squareSize}px;`;

    gridContainer.appendChild(squareClone);

}

//grid relevant stuff

gridContainer.style.cssText = `height: ${gridSize}px; width: ${gridSize}px;` ;
gridContainer.addEventListener('mouseover', (event) => {

    if (event.target.classList.contains('square') && event.buttons === 1) {
        event.prevent
        event.target.style.backgroundColor = 'black';
    }

}, true);



eraseButton.setAttribute('id', 'erase-button')
eraseButton.textContent = "erase";

document.body.insertBefore(eraseButton, gridContainer);

eraseButton.addEventListener('click', () => {

    let squares = document.querySelectorAll('.square');

    squares.forEach((square) => {
        square.style.backgroundColor = 'white';
    });

});

//document relevant stuff 

document.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('square')) {
        event.preventDefault();
        event.target.style.backgroundColor = 'black';
    }
}, true);

function changeSquareColor(target, color) {
    if (target.classList.contains('square')) {
        target.style.backgroundColor = color;
    }
}

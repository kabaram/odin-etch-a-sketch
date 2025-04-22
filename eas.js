//Toggle action listener for coloring
function toggleColor() {
    coloring = !coloring;
    activatePixels();

    let container = document.getElementById('pen-on-indicator-container');
    let onIndicator = document.getElementById('pen-on-indicator');
    if(coloring==true){
        onIndicator.textContent = 'ON';
        onIndicator.style.color='chartreuse';
    }
    else{
        onIndicator.textContent = 'OFF';
        onIndicator.style.color = 'firebrick';
    }
}

//Add functionality to color pixels on mouse hover
function activatePixels() {

    if (coloring == true) {
        for (let i = 0; i < allPixels.length; i++){
            pixelListeners.push(function(){allPixels[i].style.backgroundColor = pixelColor;});
            allPixels[i].addEventListener('mouseenter', pixelListeners[i]);
        }
    }
    else {
        for (let i = 0; i < allPixels.length; i++){
            allPixels[i].removeEventListener('mouseenter', pixelListeners[i]);
        }
        pixelListeners = [];
    }
}


//Produce a dim * dim grid of "pixels" on the screen element
//Function adapted from the contribution of Chris Gessler via StackOverflow
function drawPixels(dim) {
    for (let i = 0; i < allPixels.length; i++){
        allPixels[i].remove();
    }
    //Calculate percentage of screen allocated to single pixel dimension
    let percent = Math.floor(1.0 / dim * 100);
    let screen = document.querySelector('.screen');
    for (let r = 0; r < dim; r++) {
        let row = document.createElement('div');
        row.style.height = percent + '%';
        row.className = 'pixel-row';
        for (let c = 0; c < dim; c++) {
            let pixel = document.createElement('div');
            pixel.className = 'pixel';
            pixel.style.width = percent + '%';
            row.appendChild(pixel);
        }
        screen.appendChild(row);
    }
    allPixels = Array.from(document.querySelectorAll('.pixel'));
}

function styleInactiveButton(button) {
    button.style.backgroundColor = 'black';
    button.style.color = '#edf2f4';
    button.style.borderColor = '#edf2f4';
    button.classList.remove('.active-resolution-button');
    button.style.scale = '.91';
}

function styleActiveButton(button) {
    button.style.backgroundColor = '#edf2f4';
    button.style.color = '#2b2d42';
    button.style.borderColor = '#8d99ae';
    button.classList.add('.active-resolution-button');
    button.style.scale = '1.1';
}

//Reset board with new resolution
//pre: new resolution is different from current resolution
function onResButtonClick(resButtons, selectedButton) {
    let size = parseInt(selectedButton.getAttribute('data-size'));
    if (size !== currentDim) {
        let screen = document.querySelector('.screen');
        screen.innerHTML = '';
        pixelListeners = [];
        drawPixels(size);
        activatePixels();
        currentDim = size;
        resButtons.forEach((button) => styleInactiveButton(button));
        styleActiveButton(selectedButton);
    }
}

let currentDim = 16;
let pixelColor = 'black';

//Add functionality to the erase button
const eraseButton = document.getElementById('erase-button');
eraseButton.addEventListener('click', function () {
    let pixels = Array.from(document.querySelectorAll('.pixel'));
    pixels.forEach((pixel) => pixel.style.backgroundColor = '#edf2f4');
});
eraseButton.addEventListener('mouseenter', function () {
    eraseButton.style.scale = '1.1';
    eraseButton.style.textShadow = '0 0 2px #ef233c'
    eraseButton.style.color = '#d90429';
    eraseButton.style.boxShadow = '0 0 8px #ef233c';
});
eraseButton.addEventListener('mouseleave', function () {
    eraseButton.style.scale = '.91';
    eraseButton.style.color = 'goldenrod';
    eraseButton.style.textShadow = '0 0 2px palegoldenrod'
    eraseButton.style.boxShadow = '0 0 8px palegoldenrod';
});

//Add functionality to resolution buttons
const resButtons = Array.from(document.querySelectorAll('.resolution-button'));
resButtons.forEach((button) => {
    button.style.scale = 0.9;
    button.addEventListener('click', function () { onResButtonClick(resButtons, button) });
    button.addEventListener('mouseenter', function () {
        if (!button.classList.contains('.active-resolution-button')) {
            button.style.color = 'palegoldenrod';
            button.style.borderColor = 'palegoldenrod';
            button.style.scale = '1.1';
        }
    });
    button.addEventListener('mouseleave', function () {
        if (!button.classList.contains('.active-resolution-button')) {
            button.style.color = '#edf2f4';
            button.style.borderColor = '#edf2f4';
            button.style.scale = '.91';
        }
    });
});

//Add functionality to color picker
const colorPicker = document.getElementById('pen-color');
colorPicker.addEventListener('input', function () {
    pixelColor = colorPicker.value;
})

//Create initial board
var allPixels = [];
drawPixels(currentDim);
var coloring = true;
var pixelListeners = []; //event listeners (saved for removal)
activatePixels();
styleActiveButton(document.getElementById('initial-res-button'));

//Add functionaity to toggle coloring
const body = document.getElementById('body-all');
body.addEventListener('keydown', function (event) {
    if (event.shiftKey) {
        toggleColor();
    }
});


//Add functionality to color pixels on mouse hover
function activatePixels() {
    let allPixels = Array.from(document.querySelectorAll('.pixel'));
    allPixels.forEach((pixel) => pixel.addEventListener('mouseenter', function () { pixel.style.backgroundColor = pixelColor }));
}

//Produce a dim * dim grid of "pixels" on the screen element
//Function adapted from the contribution of Chris Gessler via StackOverflow
function drawPixels(dim) {
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
}

let pixelColor = 'black';

drawPixels(16);
activatePixels();


//Add functionality to resolution buttons
let resButtons = Array.from(document.querySelectorAll('.resolution-button'));
resButtons.forEach((button) => button.addEventListener('click', function () {
    let screen = document.querySelector('.screen');
    screen.innerHTML = '';
    let size = parseInt(button.getAttribute('data-size'));
    drawPixels(size);
    activatePixels();
}))
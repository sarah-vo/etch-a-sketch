const canvas = document.querySelector('.canvas');
//Variables and functions for canvas size
//1: 8x8, 2: 16x16, 3: 32x32, 4: 64x64, 5: 128x128
let canvasSize = "8";
let hasWiped = true;
function setCanvasSize() {

    //smallest number of boxes per line (both vertically and horizontally)
    let userBoxNumber=parseInt(canvasSize);

    canvas.style.gridTemplateRows = `repeat(${userBoxNumber}, 1fr)`;
    canvas.style.gridTemplateColumns = `repeat(${userBoxNumber}, 1fr)`;

    canvas.textContent = '';
    for(let i = 0; i < userBoxNumber*userBoxNumber; i++){
        canvas.appendChild(document.createElement('div')).classList.add(`canvas-box`);
    }

}

canvasSizeChanger = (value) => {
    if(!hasWiped){
        alert(`Please wipe your canvas before you change grid size ヽ(ಠ_ಠ)ノ`);
        $(`.slider`).prop(`value`, canvasSize);
        return;
    }
    canvasSize = value;
    document.querySelector(`.grid-size`).innerText = `Grid size: ${canvasSize}x${canvasSize}`;
    setCanvasSize();
}
let mouseDown = false;

function randomColor(){
    return `${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}`;
}

colorMode = (mode) =>{
    const allBox = canvas.querySelectorAll('.canvas-box');

    function colorAdjuster(box) {
        if (mode === `rainbow`) {
            $(box).css(`background-color`, `rgb(${randomColor()})`);
        } else if (mode === `black`) {
            $(box).css(`background-color`, `rgb(000, 000, 000)`);
        } else if (mode === `eraser`) {
            $(box).css(`background-color`, `rgb(256, 256, 256)`);
        } else if(mode === `none`){
            console.log(`no options selected`);
            $(box).css(`background-color`, `rgb(256, 256, 256)`);

        }
    }

    allBox.forEach(box =>{
        box.addEventListener(`mousedown`, ()=> {
            mouseDown = true;
            colorAdjuster(box);
        });
        window.addEventListener(`mouseup`, ()=> mouseDown = false);
        box.addEventListener('mouseover', () => {
            if(mouseDown){
                colorAdjuster(box);
            }
        });
    })
}



//Reads user mode selection
let modeSelection =`none`;


function readOptions() {
    let colorOptions = $(`input[name=buttonGroup]`)
    colorOptions.bind(`click`, ()=>{
        modeSelection = document.querySelector('input[type="radio"][name="buttonGroup"]:checked').value;
        colorMode(modeSelection);
        hasWiped = false;
    })

    $(`#wipe`).bind(`click`, () =>{
        $(`.canvas-box`).css(`background-color`, `rgb(256, 256, 256)`);
        colorOptions.prop(`checked`, false);
        colorOptions.buttons = `refresh`;
        modeSelection = `none`;
        colorMode(modeSelection);
        hasWiped = true;
    })
}

window.onload = () =>{
    setCanvasSize();
    readOptions();

}
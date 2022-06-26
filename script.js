const canvas = document.querySelector('.canvas');
const gridSizeText = document.querySelector(`.grid-size`);


//Variables and functions for canvas size
//1: 8x8, 2: 16x16, 3: 32x32, 4: 64x64, 5: 128x128
let canvasSize = "4";
function canvasSizeText(){
    switch (canvasSize) {
        case "1":
            return "8x8";
        case "2":
            return "16x16";
        case "3":
            return "32x32";
        case "4":
            return "64x64";
        case "5":
            return "128x128";
    }
}

function setCanvasSize() {
    //smallest number of boxes per line (both vertically and horizontally)
    let smallestBoxNumber = 8;
    let userBoxNumber = smallestBoxNumber * parseInt(canvasSize);

    canvas.style.gridTemplateRows = `repeat(${userBoxNumber}, 1fr)`;
    canvas.style.gridTemplateColumns = `repeat(${userBoxNumber}, 1fr)`;

    console.log(`canvas size: ${canvasSize}, user box number: ${userBoxNumber}`);
    console.log(`number of boxes are: ${userBoxNumber*userBoxNumber}`)
    canvas.textContent = '';
    for(let i = 0; i < userBoxNumber*userBoxNumber; i++){
        canvas.appendChild(document.createElement('div')).classList.add(`canvas-box`);
    }

}

canvasSizeChanger = (value) => {
    console.log("`canvasSizeChanger evoked`")
    canvasSize = value;
    gridSizeText.innerText = `Grid size: ${canvasSizeText()}`;
    setCanvasSize();
}
let mouseDown = false;
colorMode = (mode) =>{
    const allBox = canvas.querySelectorAll('.canvas-box');
    if(mode === `wipe`){
        $(`.canvas div`).removeClass(`black rainbow select-color eraser`)
    }
    allBox.forEach(box =>{
        box.addEventListener(`mousedown`, ()=> {
            mouseDown = true;
            box.className = `${mode} canvas-box`;
        });
        window.addEventListener(`mouseup`, ()=> mouseDown = false);
        box.addEventListener('mouseover', () => {
            if(mouseDown){
                box.className = `${mode} canvas-box`;
            }
        });
    })
}



//Reads user mode selection
let modeSelection;


document.querySelectorAll(`input[type="radio"][name="buttonGroup"]`).forEach((button)=>
        button.addEventListener('click', () => {
            modeSelection = document.querySelector('input[type="radio"][name="buttonGroup"]:checked').value;
            console.log(modeSelection);
            colorMode(modeSelection);
        }))
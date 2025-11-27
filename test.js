const user = document.querySelector("#user");
const board = document.querySelector(".board");

// control buttons on screen
const upBtn = document.querySelector(".moveup");
const downBtn = document.querySelector(".movedown");

const boardHeight = board.clientHeight;
const userHeight = user.clientHeight;

var speed = 10;
var userPadY = boardHeight - userHeight - 10;

let offsetY = 0;
let isDragging = false;

// some imp values
var maxTop = 440;
// board is 550, player is 100, and 10 padding ig (550-100-10)

// making player paddle draggable
user.addEventListener("pointerdown", (e) => {
    isDragging = true;
    offsetY = e.clientY - user.offsetTop;
});

document.addEventListener("pointerup", () =>{
    isDragging =false;
})

document.addEventListener("pointermove", (e) =>{
    if (isDragging) {
        user.style.top = `${e.clientY - offsetY}px`;
    }
});


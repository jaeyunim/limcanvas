const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");

const range = document.querySelector(".jsRange input");

const fillOrPaint = document.querySelector(".jsMode button:first-child");

const color = document.querySelectorAll(".color");

const saveBtn = document.querySelector(".jsMode button:last-child");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#212529";
ctx.lineWidth = 2.5;

let painting = false;

ctx.fillStyle = "#e5e5e5"
ctx.fillRect(0,0,canvas.width,canvas.height);

const colorArr = Array.from(color);

colorArr.forEach(function (item) {
    item.addEventListener("click", changeColor);
});

function changeColor(event) {
    const clickedColor = event.target.style.backgroundColor;
    if(fillOrPaint.innerHTML === "COLOR"){
        console.log("i will paint");
        ctx.strokeStyle = clickedColor;
    } else if(fillOrPaint.innerHTML === "FILL") {
        console.log("i will fill");
        ctx.fillStyle = clickedColor;
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown() {
    painting = true;
}

function onMouseUp() {
    painting = false;
}

function controlContextMenu(event) {
    event.preventDefault();
}

function onMouseLeave() {
    painting = false
}

function handleRange() {
    const changingRange = range.value;
    ctx.lineWidth = changingRange;
}

function setMode() {
    let now = fillOrPaint.innerHTML;
    if (now === "FILL") {
        fillOrPaint.innerHTML = "PAINT"
    } else {
        fillOrPaint.innerHTML = "FILL"
    }
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "MYCANVAS🎨";
    link.click();
}

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mouseleave", onMouseLeave);
canvas.addEventListener("contextmenu", controlContextMenu);
saveBtn.addEventListener("click", handleSaveClick);

range.addEventListener("input", handleRange);

fillOrPaint.addEventListener("click", setMode);

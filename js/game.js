const moves = document.getElementById("moves-count");
const timesValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");

let cards;
let interval;
let firstCard = false;
let secondCard = false;

//Items array

const items = [
    { name: "1", image: "1.png" },
    { name: "2", image: "2.png" },
    { name: "3", image: "3.png" },
    { name: "4", image: "4.png" },
    { name: "5", image: "5.png" },
    { name: "6", image: "6.png" },
    { name: "7", image: "7.png" },
    { name: "8", image: "8.png" },
];

//Initial time
let seconds = 0, minutes = 0;

//Initial moves and win count
let movesCount = 0, winCount = 0;

//For time
const timeGenerator = () => {
    seconds += 1;
    //minutes logic
    if (seconds >= 60){
        minutes += 1;
        seconds = 0;
    }

    //Format time before displaying
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timesValue.innerHTML = `<span>Tempo: </span>${minutesValue}:${secondsValue}`;
};

//For calculating moves 
const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>Moves:</span>${movesCount}`;    
};

//Pick random objects from the items array
const generateRandom = (size = 4) => {
    //temporary array
    let tempArray = [...items];
    //initializes cardValues array 
};  
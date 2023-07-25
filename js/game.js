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
    { name: "9", image: "9.png" },
    { name: "10", image: "10.png" },
    { name: "11", image: "11.png" },
    { name: "12", image: "12.png" },
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
    moves.innerHTML = `<span>Movimentos: </span> ${movesCount}`;    
};

//Pick random objects from the items array
const generateRandom = (size = 4) => {
    //temporary array
    let tempArray = [...items];
    //initializes cardValues array 
    let cardValues = [];
    //size should be doulbe (4*4 matrix)/2 since pairs of objects would exist
    size = (size * size) / 2;
    //random object selection
    for (let i = 0; i < size; i++){
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        //once selected remove the object from temp array
        tempArray.splice(randomIndex, 1);
    }
    return cardValues;
};  

const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    //Embaralhamento simples
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * size; i++){
        /*Create Cards
            before => front side (contains question mark)
            after => back side (contains actual image)
            data-card-values is a custom attribute which stores the names of the cards to match later
        */
       
        gameContainer.innerHTML += `
        <div class="card-container" data-card-value="${cardValues[i].name}">
            <div class="card-before" >
                <img src="./assets/img/heart.png" class="heart">
            </div>
            <div class="card-after">
                <img src="./assets/img/${cardValues[i].image}" class="image">
            </div>
        </div>    
    `}

    //Grid
    gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;

    //Cards
    cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            //Se o cartão selecionado ainda não for correspondido, apenas execute (ou seja, o cartão já correspondido quando clicado será ignorado).
            if (!card.classList.contains("matched")) {
                //Gira o card clicado
                card.classList.add("flipped");
                //Se for o primeiro card (!firstCard é inicialmente falso)
                if(!firstCard){
                    //Então o card atual irá virar o firstCard
                    firstCard = card;
                    //O valor atual das cartas se torna o firstCardValue
                    firstCardValue = card.getAttribute("data-card-value");
                } else {
                    //movimentos de incremento desde que o usuário selecionou o secondCard
                    movesCounter();
                    //secondCard  e o valor
                    secondCard = card;
                    let secondCardValue = card.getAttribute("data-card-value");
                    if (firstCardValue == secondCardValue){
                        firstCard.classList.add("matched");
                        secondCard.classList.add("matched");
    
                        firstCard = false;
    
                        winCount += 1;
    
                        if (winCount == Math.floor(cardValues.length / 2)) {
                            result.innerHTML = `<h2>Você Ganhou</h2> <h4>Movimentos: ${movesCount}</h4>`;
                            stopGame();
                        }
                    } else {
                        let [tempFirst, tempSecond] = [firstCard, secondCard];
                        firstCard = false;
                        secondCard = false;
                        let delay = setTimeout(() => {
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped");
                        }, 700);
                    }
                }
            } 
        });
    });
};

//start game
startButton.addEventListener("click", () => {
    movesCount = 0;
    time = 0;
    controls.classList.add("hide");
    stopButton.classList.remove("hide");
    startButton.classList.add("hide");

    interval = setInterval(timeGenerator, 1000);
    seconds = 0, minutes = 0;

    moves.innerHTML = `<span>Movimentos:</span> ${movesCount}`;
    initializer();
});

//Stop
stopButton.addEventListener("click", 
    (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
}));

//Initialize values and func calls
const initializer = () => {
    result.innerHTML = "";
    winCount = 0;
    let cardValues = generateRandom();
    matrixGenerator(cardValues);
};

initializer();
const move = document.getElementById("move-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const control = document.querySelector(".control-container");

let cards;
let interval;
let firstCard = false;
let secondCard = false;

const item = [{ name: "bee", Image: "bee.png" },
{ name: "car", Image: "car.jpeg" },
{ name: "samosa", Image: "samosa.jpeg" },
{ name: "chameleon", Image: "chameleon.jpeg" },
{ name: "crocodile", Image: "crocodile.jpeg" },
{ name: "crow", Image: "crow.jpeg" },
{ name: "crown", Image: "crown.jpeg" },
{ name: "snake", Image: "snake.jpeg" },
{ name: "monkey", Image: "monkey.jpeg" },
{ name: "parrot", Image: "parrot.jpeg" },
{ name: "sloth", Image: "sloth.jpeg" },
{ name: "ant", Image: "ant.jpeg" }]

let seconds = 0,
    minutes = 0;

let movesCount = 0,
    winCount = 0;

const timesGenerator = () => {
    seconds += 1;
    if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
    }

    let secondvalues = seconds < 10 ? `0${seconds}` : seconds;
    let minutesvalues = minutes < 10 ? `0${minutes}` : minutes;

    timeValue.innerHTML = `<span>Time :</span>${minutesvalues}:${secondvalues}`
};

const movesCounter = () =>{
    movesCount += 1;
    move.innerHTML = `<span> Moves :</span>${movesCount}`;
};


const generateRandom = (size = 4) => {
    let tempArray = [...item];
    let cardValues = [];
    size = (size * size) / 2;
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardValues.push(tempArray[randomIndex]);

        tempArray.splice(randomIndex, 1);
        console.log(tempArray)
    };
    return cardValues;
};

const matrixGenerator = (cardValues, size = 16) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size; i++) {
        gameContainer.innerHTML += `
      <div class="card-container" data-card-value = "${cardValues[i].name}">
         <div class ="card-before">?</div>
         <div class ="card-after">
         <img src="${cardValues[i].Image}" class="image"/>
         </div>
      </div>`;
    }


    cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            if (!card.classList.contains("matched")) {
                card.classList.add("flipped");
                if (!firstCard) {
                    firstCard = card;
                    firstcardValue = card.getAttribute("data-card-value");
                } else {
                    movesCounter();
                    secondCard = card;
                    let secondCardValue = card.getAttribute("data-card-value");
                    if (firstcardValue == secondCardValue) {
                        firstCard.classList.add("matched");
                        secondCard.classList.add("matched");

                        firstCard = false;
                        winCount += 1;
                        if (winCount == Math.floor(cardValues.length / 2)) {
                            result.innerHTML = `<h2> You Won</h2>
                        <h4> Moves:${movesCount}`;
                            stopGame();
                        }
                    }
                    else {
                        let [tempFirst, tempSecond] = [firstCard, secondCard];
                        firstCard = false;
                        secondCard = false;
                        let delay = setTimeout(() => {
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped")
                        }, 600)
                    }
                }
            }

        });
    });


};

startButton.addEventListener("click" ,() => {
    movesCount = 0;
    seconds = 0;
    minutes = 0;
    control.classList.add("hide");
    stopButton.classList.remove("hide");
    startButton.classList.add("hide");
    clearInterval(interval)
    interval = setInterval(timesGenerator,1000);

    move.innerHTML = `<span>Moves:</span>${movesCount}`;
    initializer();

})

stopButton.addEventListener("click",
    (stopGame = ()=>{
    control.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
})
);

const initializer = () => {
    result.innerText = "";
    winCount = 0;
    let cardValues = generateRandom();
    matrixGenerator(cardValues);
};
  


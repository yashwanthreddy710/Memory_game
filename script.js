document.addEventListener("readystatechange", function () {
    if (document.readyState === "complete") {
        startGame();
    }
});

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

function startGame() {
    const gameBoard = document.getElementById("gameBoard");
    const restartBtn = document.getElementById("restart");
    
    let images = ["images/html.jpg", "images/css3.svg", "images/javascript.png", "images/react.webp", "images/node.webp", "images/angular.png", "images/mysql.png", "images/mongodb.svg"];
    let cards = images.concat(images);
    cards = shuffleArray(cards);

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let currentPlayer = 1; 
let scores = { player1: 0, player2: 0 };

gameBoard.innerHTML = "";

const playerDisplay = document.getElementById("player-display");

function updatePlayerDisplay() {
    playerDisplay.textContent = `Turn : Player ${currentPlayer}`;
}

function switchPlayer() {
    if(currentPlayer===1){
        currentPlayer=2;
    }
    else{currentPlayer=1;
        }
    updatePlayerDisplay();
}

function updateScores() {
    document.getElementById("score1").textContent = `Player 1: ${scores.player1}`;
    document.getElementById("score2").textContent = `Player 2: ${scores.player2}`;
}

for (let i = 0; i < cards.length; i++) {
    let card = document.createElement("div");
    card.className = "card";
    
    let img = document.createElement("img");
    img.src = cards[i];
    img.style.display = "none"; 
    
    card.appendChild(img);
    
    card.addEventListener("click", function () {
        if (lockBoard || card.classList.contains("flipped")) return;

        card.classList.add("flipped");
        img.style.display = "block";

        if (!firstCard) {
            firstCard = card;
        } else {
            secondCard = card;
            lockBoard = true;

            setTimeout(() => {
                if (firstCard.firstChild.src === secondCard.firstChild.src) {
                    scores[`player${currentPlayer}`]++;
                } else {
                    firstCard.classList.remove("flipped");
                    secondCard.classList.remove("flipped");
                    firstCard.firstChild.style.display = "none";
                    secondCard.firstChild.style.display = "none";
                    switchPlayer(); 
                }

                firstCard = null;
                secondCard = null;
                lockBoard = false;
                updateScores();
            }, 1000);
        }
    });

    gameBoard.appendChild(card);
}

updatePlayerDisplay();
updateScores();

    
    restartBtn.addEventListener("click", startGame);
}